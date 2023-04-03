<template>
	<view class="popup-wrap" v-if="popup">
		<view class="popup-box">
			<view class="popup-close" @click="cancle">
				<text class="iconfont icon-shanchu"></text>
			</view>
			<view class="popup-con detail-wrap no-mt">
				<view class="detail-item flex tc">
					<text class="detail-label flex1 no-mr p15 color333">确认报名？</text>
				</view>
				<view class="popup-btn flex flexmid">
					<view class="popup-btn-item flex1">
						<button class="popup-cancle" @click="cancle">取消</button>
					</view>
					<view class="popup-btn-item flex1">
						<button class="popup-confirm" @click="confirm">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'popup',
		props:{
			info:{}
		},
		data() {
			return {
				popup: false
			}
		},
		methods: {
			init(){
				this.popup = true;
			},
			cancle() {
				this.popup = false;
			},
			confirm() {
				var params = {};
				params = {
					activityId:this.info.activity.id,
					activityName:this.info.activity.name,
					studentSn:this.$store.state.user.ext.sn,
					studentName:this.$store.state.user.ext.name,
					className:this.$store.state.user.ext.className
				}
				/* console.log('params',params) */
				/* return false */
				this.$http.post(`/student/app/activity/signUp`,params).then(res =>{
					uni.showToast({title: "报名成功,等待审核",icon: 'none'});
					setTimeout(() => {
						this.popup = false;
						this.pageBack('loadData', 'refresh');
					}, 1500)
				}).catch(err => {
					err && uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/detail.scss';//公共样式
	@import '@/common/popup.scss';
	/deep/.w-picker .w-picker-cnt{
		-webkit-transform: translateY(200%);
		transform: translateY(200%);
	}
</style>
