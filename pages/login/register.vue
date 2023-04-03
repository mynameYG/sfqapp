<template>
	<view>
		<view class="login-bg-up"></view>
		<view class="login-bg-down"></view>
		<view class="login">
			<view class="login-inner">
				<view class="login-mid">
					<form @submit="formSubmit">
						<view class="model-wrap p15">
							<view class="model-box no-mb clearfix">
								<view class="model-item flex flexmid" @click="$refs.host.choose()">
									<text class="model-label require">所属区域</text>
									<view name="buildingId" class="model-editText tr flex1 text-ellipsis">
										<text class="gray-place" v-if="host.length < 1">请选择</text>
										<person-picker ref="host" :persons.sync="host" type="host" :multi="false" pname="选择所属区域"></person-picker>
									 </view>
									<text class="model-decorate arrow"></text>
								</view>
								<view class="model-item flex">
									<text class="model-label">门牌号</text>
									<input class="model-decorate flex1 tr ml15" type="text" name="doorNo" title="请输入门牌号" placeholder="请输入门牌号" v-model="info.doorNo">
								</view>
								<view class="model-item flex">
									<text class="model-label require">注册姓名</text>
									<input class="model-decorate flex1 tr ml15" type="text" name="name" placeholder="请输入注册姓名" v-model="info.name">
								</view>
								<view class="model-item flex">
									<text class="model-label require">手机号</text>
									<input class="model-decorate flex1 tr ml15" type="text" name="mobile" placeholder="请输入手机号(登录号)" v-model="info.mobile">
								</view>
								<view class="model-item flex mb15">
									<text class="model-label require">密码</text>
									<input class="model-decorate flex1 tr ml15" type="password" name="password" placeholder="请输入密码" v-model="info.password">
								</view>
								<button :disabled="submitting" formType="submit" class="tj">提交</button>
								<view class="btn-register" @click="jump('/pages/login/login')">去登录</view>	
							</view>
						</view>
					</form>
				</view>
			</view>
		
		</view>
	</view>

</template>
<script>
	var graceChecker = require("@/common/graceChecker.js");
	import PersonPicker from "@/components/contacts-picker/address-picker.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var first = null;
	export default {
		components:{
			PersonPicker
		},
		data() {
			return {
				info:{},
				submitting:false,
				host:[],
			}
		},
		mounted() {
		},
		methods: {
			...mapMutations(['login', 'setResources']),
			/* 提交 */
			formSubmit: function(e) {
				e.detail.value = this.info;
				console.log('this.host',this.host)
				if(this.host.length > 0){
					e.detail.value.buildingId = this.host[0].id; 
				}
				
				//定义表单规则
				var rule = [
					{
						name: "buildingId",
						checkType: "string",
						checkRule: "1,",
						errorMsg: "请选择所属区域"
					},
					{
						name: "name",
						checkType: "string",
						checkRule: "1,",
						errorMsg: "请输入注册姓名"
					},
					{
						name: "mobile",
						checkType: "phoneno",
						checkRule:"",
						errorMsg: "请输入正确的手机号"
					},
					{
						name: "password",
						checkType: "string",
						checkRule: "1,",
						errorMsg: "请输入密码"
					},
				]; 
				
				let params = e.detail.value;
				var checkRes = graceChecker.check(e.detail.value, rule);
				if (checkRes) {
					//console.log('this.fileList',this.fileList);
					console.log('formData',params);
					//return false
					this.submitting = true;
					this.$http.post('/app/pub/regist', params).then(formData => {
						uni.showToast({title: "注册成功，正在审核~",icon: 'none'});
						let pages = getCurrentPages();
						if (pages.length > 1) {
							this.pageBack('refreshTabData',);
						}else{
							this.pageBack();
						}
						this.submitting = false;
					}).catch(()=> {
						this.submitting = false;
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
	@import '@/common/form.scss';//公共样式
	/deep/ .uni-input, .uni-input-placeholder,.placeholder{
		color:#333
	}
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
		padding-bottom: 50px;
		border-radius: 15px;
	}

	.login-mid {
		font-size: 15px;
		.tj {
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
	.model-item .model-decorate{
		min-width: 18px;
		height: 100%;
	}
	.btn-register{
		margin-top: 10px;
		text-align: right;
		font-size: 14px;
	}
</style>
