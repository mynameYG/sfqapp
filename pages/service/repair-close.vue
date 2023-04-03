<template>
	<view class="popup-wrap">
		<view class="popup-box">
			<view class="popup-close" @click="cancle">
				<text class="iconfont icon-shanchu"></text>
			</view>
			<view class="popup-con">
				<view class="popup-title">
					评分
				</view>
				<form @submit="formSubmit">
					<view class="model-box">
						<view class="model-item flex flexmid no-all-b">
							<text class="model-label" style="width:70px">请打分</text>
							<view class="flex1">
								<view class="example-body">
									<uni-rate v-model="rateValue" @change="onChange" />
								</view>
							</view>
						</view>
					</view>
					<view class="popup-btn flex flexmid">
						<view class="popup-btn-item flex1">
							<button class="popup-cancle" @click="cancle">取消</button>
						</view>
						<view class="popup-btn-item flex1">
							<button class="popup-confirm" form-type="submit">确定</button>
						</view>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	var graceChecker = require("@/common/graceChecker.js");
	export default {
		components:{
			uniRate
		},
		name: 'popup',
		data() {
			return {
				info:{},
				rateValue:0,
			}
		},
		onLoad(option) {
			let _self = this;
			const eventChannel = this.getOpenerEventChannel()
			  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			  eventChannel.on('acceptDataFromOpenerPage', function(data) {
				  _self.info = data;
				  console.log('111',_self.info)
		  })
		},
		methods: {
			cancle() {
				uni.navigateBack();
			},
			onChange(e) {
				console.log('rate发生改变:' + JSON.stringify(e))
				this.rateValue = e.value;
				// console.log(this.rateValue);
				
			},
			/* 提交 */
			formSubmit: function(e) {
				e.detail.value.id = this.info;
				e.detail.value.score = this.rateValue;
				//定义表单规则
				var rule = [];
				//进行表单检查
				var formData={};
				var checkRes = graceChecker.check(e.detail.value,rule);
				if (checkRes) {
					console.log('formData',e.detail.value);
					//return false
					this.$http.post(`/app/tenement/repair/close/${e.detail.value.id}?score=${e.detail.value.score}`).then(res => {
						uni.showToast({title: "关闭成功",icon: 'none'});
						setTimeout(() => {
							uni.navigateBack();
						}, 1000)
					}).catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						})
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/form.scss';
	@import '@/common/popup.scss';
	.popup-con{
	    padding: 20px 10px 30px;
	}
	.model-textarea{
		border-radius: 3px;
		padding:3px 6px;
		border:1px solid #E4E4E4
	}
	.model-item{
		padding:5px 0;
		font-size:14px;
		/deep/ .uni-label-pointer + .uni-label-pointer{
			margin-left: 15px;
		}
	}
	.model-item .model-editText{
		border: 1px solid #eeeeee;
		margin-left: 0;
		padding-left: 5px;
	}
	/deep/.w-picker .w-picker-cnt{
		-webkit-transform: translateY(200%);
		transform: translateY(200%);
	}
</style>
