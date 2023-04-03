<template>
	<view>
		<view class="login-bg-up"></view>
		<view class="login-bg-down"></view>
		<view class="login">
			<view class="login-inner">
				<view class="login-mid">
					<view class="login-box flex flexmid">
						<text class="iconfont icon-lianxiren"></text>
						<input type="text" v-model="user.username" placeholder="请输入用户名" class="flex1" placeholder-class="login-place">
					</view>
					<view class="login-box flex flexmid" style="margin-bottom: 20px;">
						<text class="iconfont icon-xiugaimima"></text>
						<input type="password" v-model="user.password" placeholder="请输入密码" class="flex1" placeholder-class="login-place">
					</view>
					<!-- <view class="login-tip">
						<view class="login-remeber">
							<label>
								<checkbox :checked='rememberPsw' @tap="rememberPsw =! rememberPsw" color="#0077AA" style="transform:scale(0.7)" />记住密码
							</label>
						</view>
					</view> -->
					<button class="tj" @click="loginSubmit">登录</button>
					<view class="btn-register" @click="jump('/pages/login/register')">去注册</view>	
						
				</view>
			</view>
		
		</view>
	</view>

</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var first = null;
	export default {
		data() {
			return {
				user: {
					username: '',
					password: ''
				},
				rememberPsw: true,
			}
		},
		mounted() {
			let that = this;
			//页面加载完成，获取本地存储的用户名及密码
			const userName = uni.getStorageSync('userName');
			const userPsw = uni.getStorageSync('userPsw');
			if (userName && userPsw) {
				that.user.username = userName;
				that.user.password = userPsw;
			} else {
				that.user.username = "";
				that.user.password = "";
			}
		},
		methods: {

			...mapMutations(['login', 'setResources']),
			loginSubmit() {
			/* 	uni.reLaunch({
					url: '/pages/map/map'
				}); 
				return; */
				if (!this.user.username) {
					uni.showToast({
						icon: 'none',
						title: '请输入账号信息'
					});
					return;
				}
				if (!this.user.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}
				var _password = this.user.password;
				const that = this;
				this.$http.post('/app/login', this.user).then(user => {
					console.log('user',user)
					//登录成功将用户名密码存储到用户本地
					if (that.rememberPsw) { //用户勾选“记住密码”
						uni.setStorageSync('userName', that.user.username);
						uni.setStorageSync('userPsw', that.user.password);
					} else { //用户没有勾选“记住密码”
						uni.removeStorageSync('userName');
						uni.removeStorageSync('userPsw');
						that.user.username = "";
						that.user.password = "";
					}
					
						this.login({
							user
						});
						
						// #ifdef APP-PLUS
						var info = plus.push.getClientInfo();
						var vinfo = info.clientid;
						uni.setStorageSync('vinfo', vinfo);
						//console.log('clientid',vinfo)
						//plus.nativeUI.toast("clientid" + plus.push.getClientInfo().clientid);
						this.getPushInfo(vinfo);
						// #endif
						
					if(user.ext.status.value == 'unaudit'){
						uni.showToast({
							icon: 'none',
							title: '正在审核中，请耐心等待'
						});
						return;
					}else if(user.ext.status.value == 'audit_fail'){
						uni.showToast({
							icon: 'none',
							title: '审核未通过，请联系物业中心了解详情'
						});
						return;
					}
					uni.showToast({
						icon: 'none',
						title: '登录成功'
					});
					uni.reLaunch({
							url: '/pages/map/map'
						}); 
					
					/* uni.reLaunch({
						url: '/pages/problem/problem-index'
					}); */
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none',
					})
				});
			},
			// 获取clientId
			getPushInfo(id) {
				var clientid = uni.getStorageSync('vinfo');
				if (id == clientid) { //没换手机
					this.$http.post('/notify/app/registerCid?clientId=' + clientid).then(res => {})
				} else { //换手机了，从新获取，本地存储一下。
					var info = plus.push.getClientInfo();
					var vinfo = info.clientid;
					uni.setStorageSync('vinfo', vinfo);
					this.$http.post('/notify/app/registerCid?clientId=' + vinfo).then(res => {})
				}
			
			
			}
			

		}
	}
</script>

<style lang="scss">
	.login-bg-up{
		height: 30vh;
		background: url(../../static/img/new-login-bg.jpg) center center;
		background-size: 100% 30vh;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.login-bg-down{
		position: absolute;
		bottom:0;
		left:0;
		width:100%;
		height: 28vh;
		background: url(../../static/img/login-down.png);
		background-size: 100% 100%;
	}
	.login {
		position: absolute;
		top: 50%;
		width:100%;
		min-height: 180px;
		transform: translateY(-40%);
		padding:0 10%;
		box-sizing: border-box;
	}
	.login-inner{
		width:100%;
		height: 100%;
		padding-bottom: 30px;
		border-radius: 15px;
	}

	.login-mid {
		font-size: 15px;
		.tj {
			margin-top: 60px;
			width: 100%;
			height: 40px;
			background-color: #2875E9;
			border-radius:18px;
			font-size: 15px;
			color: #fff;
			line-height: 40px;
			padding: 0 !important;
			border: none;
		}
	}

	.login-box {
		margin-bottom: 25px;
		border-bottom: 1px solid #e6e6e6;
		padding:8px 10px;
		padding-left: 0;

		.iconfont {
			margin-right: 6px;
			width: 18px;
			height: 18px;
			color: #DDD;
		}
		.icon-lianxiren{
			&::before{
				display: none;
			}
			background: url(../../static/img/user.png) no-repeat;
			background-size: contain;
		}
		.icon-xiugaimima{
			&::before{
				display: none;
			}
			background: url(../../static/img/password.png) no-repeat;
			background-size: contain;
		}
		
		.login-place {
			color: #999;
			font-size: 14px;
		}

		input {
			height: 20px !important;
			padding: 0 5px !important;
			margin: 0;
			font-size: 15px;
			color: #333;
			line-height: 20px;
			border: none !important;
		}
	}

	.login-tip {
		margin-bottom: 20px;

		.login-remeber {
			font-size: 14px;
			color: #949494;
			line-height: 20px;

			input {
				margin-right: 6px;
			}

		}
	}

	/* #ifdef H5 */
	uni-checkbox .uni-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		color: #fff;
		background: #18AE65;
	}

	.uni-checkbox-input.uni-checkbox-input-checked {
		border: none !important;
	}

	/* #endif */
	/* 微信中样式 */
	/* #ifdef APP-PLUS ||MP-WEIXIN */
	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		color: #fff;
		background: #18AE65;
	}

	.wx-checkbox-input.wx-checkbox-input-checked {
		border: none !important;
	}

	/* #endif */
	.login-code{
		border-bottom:0;
		.code-input{
			border-bottom: 1px solid #e6e6e6;
		}
		.icon-yanzhengma{
			font-size: 20px;
		}
		.code-btn{
			padding:0;
			margin-left: 5px;
			width:100px;
			height: 40px;
			line-height: 40px;
			font-size:14px;
			background-color: #FFF;
			border:1px solid #e6e6e6;
			.code-img{
				width:100%;
				height: 100%;
			}
		}
		.code-btn-disable{
			background-color:#e6e6e6 ;
		}
	}
	
	.btn-register{
		margin-top: 10px;
		text-align: right;
		font-size: 14px;
	}
	
</style>
