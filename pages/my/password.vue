<template>
	<view class="yh-bg">
		<view class="model-input-box whiteBg-opacity">
			<view class="model-input-item flex flexmid">
				<text class="model-label require">原密码：</text>
				<input type="password" v-model="oldPassword" placeholder="请输入原密码" class="model-input tr flex1 " require>
			</view>
			<view class="model-input-item flex flexmid">
				<text class="model-label require">新密码：</text>
				<input type="password" v-model="password" placeholder="请输入新密码" class="model-input tr flex1 " require>
			</view>
			<view class="model-input-item flex flexmid">
				<text class="model-label require">确认新密码：</text>
				<input type="password" v-model="passwordCopy" placeholder="请再次输入新密码" class="model-input tr flex1 " require>
			</view>
			<view class="submit-wrap"><button @tap="submitData()" class="tj">提交</button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: "",
				password: "",
				passwordCopy: ""
			}
		},
		mounted() {},
		methods: {
			submitData() {
				if (!this.oldPassword) {
					uni.showToast({
						icon: 'none',
						title: '请输入原始密码'
					});
					return;
				}
				if (!this.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入新密码'
					});
					return;
				}
				if (!this.passwordCopy) {
					uni.showToast({
						icon: 'none',
						title: '请输入确认密码'
					});
					return;
				}

				if (this.password != this.passwordCopy) {
					uni.showToast({
						icon: 'none',
						title: '新密码和确认密码不一致'
					});
					return;
				}
				this.$http.post('/app/password?oldPassword=' + this.oldPassword + '&password=' + this.password).then(r => {
					uni.showToast({
						icon: 'none',
						title: '提交成功'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}, 2000)
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			}
		},
	}
</script>

<style lang="scss">
	.model-input-box {
		padding:0 15px 0 20px;
		margin-bottom: 10px;
		.model-input-item {
			padding: 15px 0;
			border-bottom: 1px solid #F7F7F7;

			.model-label {
				margin-right: 10px;
				font-size: 14px;
				color: #333;
				line-height: 24px;
			}

			.model-input {
				font-size: 14px;
			}
		}

		.model-input-item.arrow {
			padding-right: 25px;
		}
	}
	.submit-wrap {
		width: 100%;
		padding: 15px;
		.tj {
			width: 100%;
			height: 40px;
			background-color: #267AF6;
			border-radius: 5px;
			font-size: 14px;
			color: #fff;
			line-height: 40px;
			padding: 0 !important;
			border: none;
		}
	}
</style>
