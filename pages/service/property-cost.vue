<template>
	<view class="bg">
		<!-- <view class="p15">
			<uni-search-bar placeholder="输入关键字查询" bgColor="#fff"  radius="20" @input="input"></uni-search-bar>
		</view> -->
		<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadData('add')">
			<mix-pulldown-refresh ref="mixPulldownRefresh" :top="0" @refresh="loadData('refresh')">
				<view class="pl15 pr15 list-wrap">
					<view class="detail-wrap" v-for="item in list" :key="item.id" @click="navTo(item)">
						<view class="detail-title flex flexmid">
							<view class="flex1 text-ellipsis">{{item.descripe || '-'}}</view>
							<view class="time">{{dateFilter(item.createDate,'dateminutes') || '-'}}</view>
						</view>
						<template v-if="item.startDate">
							<view class="detail-item flex" v-if="item.startDate">
								<text class="detail-label">开始时间</text>
								<text class="detail-text flex1 text-ellipsis">{{dateFilter(item.startDate,'dateminutes') || '-'}}</text>
							</view>
							<view class="detail-item flex">
								<text class="detail-label">结束时间</text>
								<text class="detail-text flex1 text-ellipsis">{{dateFilter(item.endDate,'dateminutes') || '-'}}</text>
							</view>
						</template>
						<view class="detail-item flex">
							<text class="detail-label">金额</text>
							<text class="detail-text flex1 text-ellipsis warning">
								￥{{numFilter(item.money)|| '-'}}
							</text>
						</view>
					</view>
				</view>
				<mix-load-more class="pb10" :status="loadMoreStatus"></mix-load-more>
			</mix-pulldown-refresh>
		</scroll-view>
	</view>
</template>
<script>
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	export default {
		data() {
			return {
				loadMoreStatus: 0,
				enableScroll: true,
				q: {
					pageNo: 1,
					pageSize: 10,
					total: 0
				},
				list: [],
				info:{},
				keyword:"",//搜索关键字
			}
		},
		components: {
			mixPulldownRefresh,
			mixLoadMore
		},
		watch:{
			keyword(newVal, oldVal){
				this.keyword = newVal;
				this.delay(() => {
					this.search();
				}, 300);
			}
		},
		onShow(){
			this.refresh();
		},
		mounted() {
			//this.loadData('add');
		},
		methods: {
			numFilter(value) {
				// 截取当前数据到小数点后二位
				let tempVal = parseFloat(value).toFixed(2)
				/* let realVal = tempVal.substring(0, tempVal.length - 1) */
				return tempVal
			},
			input(res) {
				this.keyword = res.value
			},
			search(){
				this.q.pageNo = 1;
				this.list = [];
				this.loadMoreStatus = 1;
				this.loadData("add");
			},
			// 滚动加载
			loadData(type) {
				if (type === 'add') {
					if (this.loadMoreStatus === 2) {
						return;
					}
					this.loadMoreStatus = 1;
				}
				if (type === 'refresh') {
					this.list = [];
					this.q.pageNo = 1;
					this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
					this.loadMoreStatus = 1;
				}
				this.getList();
			},
			getList() {
				let params = {
					page: this.q.pageNo,
					pageSize: this.q.pageSize
				};
				this.$http.get('/app/tenement/charge',params).then(res => {
					console.log('res',res)
					this.q.total = res.total;
					var changeData = [];
					changeData = res.list;
					this.list = this.list.concat(changeData);
					this.loadMoreStatus = this.list.length >= this.q.total ? 2 : 0;
					this.q.pageNo++;
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})
				});
			},
			navTo(item) {
				uni.navigateTo({
					url:`/pages/meeting/meeting-detail?id=${item.id}&status=${item.receiveStatus}`
				})
			},
			close(item){
				uni.navigateTo({
					url: `/pages/service/repair-close?id=${item}`,
					success: function(res) {
					  // 通过eventChannel向被打开页面传送数据
					  res.eventChannel.emit('acceptDataFromOpenerPage', item)
					}
				})
			},
			// 刷新列表
			refresh(){
				this.loadData('refresh');
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/detail.scss';//公共样式
	.scroll-wrap.scroll-wrap-tab-search,.panel-scroll-box{
		// #ifdef APP-PLUS
		height:100vh;
		// #endif
		// #ifndef APP-PLUS
		height: calc(100vh - 44px);
		// #endif
		box-sizing: border-box;
	}
	.detail-wrap{
		margin-top: 15px;
		margin-bottom: 0;
		overflow: inherit;
	}
	.detail-title{
		border-bottom: 1px solid #F2F2F2;
		.time{
			margin:6px 0;
		}
	}
	.detail-wrap .detail-item .detail-label{
		min-width: 56px;
	}
	.title-model{
		margin:10px 0;
		font-size:12px;
		font-weight: 500;
		.label{
			margin-right: 10px;
			padding:2px 5px;
			color:#333;
			background-color: #F2F2F2;
		}
	}
	.fixed-btn-rightBottom{
		bottom:30px;
	}
</style>
