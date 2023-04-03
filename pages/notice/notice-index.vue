<template>
	<view class="bg">
		<view class="p15">
			<uni-search-bar placeholder="输入关键字查询" bgColor="#fff" @input="input"></uni-search-bar>
		</view>
		<scroll-view class="panel-scroll-box" :scroll-y="enableScroll" @scrolltolower="loadData('add')">
			<mix-pulldown-refresh ref="mixPulldownRefresh" :top="0" @refresh="loadData('refresh')">
				<view class="pl15 pr15">
					<view class="whiteBg-opacity p15 mb15 radius4 position-relative" style="overflow: hidden;" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
						<view class="field-title fs15 text-ellipsis-2">
						<text class="event-press" v-if="item.moduleId == 'event-press'">催办</text>
						{{item.detail.title || '-'}}</view>
						<view class="flex flexmid pt5">
							<view class="field-con color666 flex1 text-ellipsis"><image class='icon' src="@/static/img/new-address.png"/>{{item.detail.gridName || ''}} - {{item.detail.community || ''}}</view>
						</view>
						<view class="flex flexmid pt5" v-if="item.detail.sendName">
							<view class="field-con color666 flex1 text-ellipsis"><image class='icon' src="@/static/img/people.png"/>{{item.detail.sendName || ''}} - {{item.detail.sendOrg || ''}}</view>
						</view>
						<view class="flex flexmid pt5">
							<view class="field-con flex1 text-ellipsis">{{dateFilter(item.createTime, "dateminutes")}}</view>
							<view class="field-con tr flex1 warning">{{item.detail.status.title}}</view>
						</view>
						<view class="message-status" v-if="item.read == '1'">未读</view>
					</view>
				</view>
				<mix-load-more :status="loadMoreStatus"></mix-load-more>
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
					type:"",
					pageNo: 1,
					pageSize: 10,
					total: 0
				},
				list: [],
				title:""
			}
		},
		components: {
			mixPulldownRefresh,
			mixLoadMore
		},
		watch:{
			title(newVal, oldVal){
				this.title = newVal;
				this.delay(() => {
					this.search();
				}, 300);
			}
		},
		onShow(){
			console.log('onShow')
			this.loadData('refresh');
		},
		methods: {
			init(){
				this.loadData('refresh');
			},
			toDetail(item){
				/* 标记已读 */
				this.$http.put(`/notify/notifyInfo/readed?businessId=${item.bussinessId}&moduleId=${item.moduleId}`).then(res =>{
					let moduleId = item.moduleId;
					var urlJson = {
						'event-accept': `/pages/problem/problem-detail-accept?id=${item.bussinessId}`,//事件受理
						'event-handle': `/pages/problem/problem-detail?id=${item.bussinessId}`,//事件
						'event-inspect': `/pages/problem/problem-detail?id=${item.bussinessId}`,//事件
						'event-audit': `/pages/problem/problem-detail?id=${item.bussinessId}`,//事件
						'event-press': `/pages/problem/problem-detail?id=${item.detail.eventId}`,//事件
						'notice': `/pages/index/notice/notice-detail?id=${item.bussinessId}`,//通知公告
					}
					if(urlJson[moduleId]){
						uni.navigateTo({
							url: urlJson[moduleId]
						});
					}else {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})
				});
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
					title: this.title,
					page: this.q.pageNo,
					pageSize: this.q.pageSize
				};
				this.$http.get('/notify/notifyInfo', params).then(res => {
					this.q.total = res.total;
					this.list = this.list.concat(res.list);
					this.loadMoreStatus = this.list.length >= this.q.total ? 2 : 0;
					this.q.pageNo++;
			
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})
				});
			},
			input(res){
				this.title = res.value
			},
			search(){
				this.loadData('refresh');
			},
		}
	}
</script>

<style lang="scss">
	.field-con{
		.icon{
			margin-right: 5px;
			width: 20px;
			height: 20px;
			vertical-align: -3px;
		}
	}
	.message-status{
		width: 70px;
		height: 30px;
		background-color: #FF0000;
		font-size: 12px;
		color: #fff;
		line-height: 40px;
		text-align: center;
		position: absolute;
		top: -5px;
		right: -26px;
		transform: rotate(45deg);
	}
	.event-press{
		color:#FF0C0C;
		font-size:12px;
		padding:2px 5px;
		margin-right: 5px;
		background-color: #FEE2E3;
	}
</style>
