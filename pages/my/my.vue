<template>
	<view class="bg">
		<view class="my-header-wrap no-road">
			<view class="my-header-box">
				<view class="my-photo">
					<image src="../../static/img/default-photo.png"></image>
				</view>
				<view class="my-name text-ellipsis">{{user.nickname || "匿名"}} ,{{user.topOrgName}}</view>
			</view>
		</view>

		<view class="my-nav p15 whiteBg no-pb">
			<view class="my-item flex flexmid arrow" @tap="jump('/pages/my/password')">
				<text class="iconfont icon-mima1"></text>
				<text class="my-text flex1">修改密码</text>
			</view>
			<view class="my-item flex flexmid arrow" style="padding-right: 30px;" @click="update">
				<text class="iconfont icon-banbengengxin"></text>
				<text class="my-text flex1">版本更新</text>
				<text class="my-text" style="color:#666" v-if="version">版本  {{version}}</text>
			</view>
			<view class="my-item flex flexmid arrow" @tap="logOut()">
				<text class="iconfont icon-tuichu"></text>
				<text class="my-text flex1">退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	import upgrade from '@/util/upgrade'
	export default {
		data() {
			return {
				user:this.$store.state.user,
				version:"",
				tabBarIndex:2
			}
		},
		mounted() {
			this.user = this.$store.state.user;
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,(inf)=>{
				this.version = inf.version
			})
			// #endif
		},
		methods: {
			...mapMutations(['logout']),
			logOut(){
				this.$http.post('/app/logout').then(r => {
					this.logout();
					uni.$emit('logout')
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})});
			},
			update(){
				upgrade.check("myUpdate");
			}
		}
	}
</script>

<style lang="scss">
	.bg{
		top:0px !important;
		background-color: #fff;
		padding-bottom: 50px;
	}
	/*我的*/
	.my-header-wrap{
	    width: 100%;
	    min-height: 178px;
	    background: url(../../static/img/my-bg.jpg) #fff no-repeat top center;
	    background-size:cover;
		/* #ifdef H5 */
		padding: 15px 15px 10px;
		/* #endif */
		/* #ifndef H5 */
		padding: 40px 15px 10px;
		/* #endif */
		.my-header-box{
		    width: 100%;
		    position:relative;  
			  .my-title{
			  	font-size:17px;
				font-weight: 600;
				color:#fff;
				text-align: center;
				.icon-bianji{
					position: absolute;
					top:0;
					right:15px;
					font-weight: 500;
					margin-top: 2px;
					font-size:18px;
				}
			  }
		}
		.my-photo{
			display: block;
			width: 60px;
			height: 60px;
			border: 3px solid #fff;
			border-radius: 50%;
			overflow: hidden;
			box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
			float: left;
		    image{
		        display: block;
		        width: 100%;
		        height: 100%;
		        border-radius: 50%;
		    }
		}
		.my-name{
			float:left;
		    font-size: 16px;
		    color:#fff;
			font-weight: 600;
		    text-align: left;
		    padding: 0 10px;
		    margin: 20px auto 0;
			width: calc(100% - 70px);
			text-shadow:0px 0px 2px rgba(0, 0, 0, 0.3);
		}
		.my-header-total{
			margin-top: 15px;
			width: 100%;
			min-height: 178px;
			border-radius: 5px;
			box-shadow: 0px 0px 10px rgba(43, 160, 247, 0.298039215686275);
			background-color: #fff;
		}
	}
	
	.no-road{
		width: 100%;
		min-height: 178px;
		/* #ifdef H5 */
		padding: 20px 15px 0;
		/* #endif */
		/* #ifndef H5 */
		padding: 20px 15px 20px;
		/* #endif */
		.my-header-box{
			width: 100%;
			position:relative;  
		}
		.my-photo{
			display: block;
			float: none;
			width: 60px;
			height: 60px;
			margin: 30px auto 0;
			border:3px solid #fff;
			border-radius: 50%;
			overflow: hidden;
			box-shadow: 0 2px 4px 2px rgba(0,0,0,.1);
			image{
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.my-name{
			width: 100%;
			font-size: 16px;
			color:#fff;
			text-align: center;
			padding: 0 25px;
			margin: 15px auto 0;
		}
	}
	.my-item{
	    width: 100%;
	    padding: 12px 0;
		border-bottom: 1px solid #f8f8f8;
		.iconfont{
			font-size: 18px;
			margin-right: 10px;
			width: 30px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			border-radius: 50%;
			color:#fff;
		}
		.icon-mima1{
			background: url(../../static/img/my-icon-mima.png) no-repeat center;
			background-size: 20px;
		}
		.icon-banbengengxin{
			background: url(../../static/img/my-icon-banben.png) no-repeat center;
			background-size: 20px;
		}
		.icon-tuichu{
			background: url(../../static/img/my-icon-tuichu.png) no-repeat center;
			background-size: 18px;
		}
		&:last-child{
			border-bottom: 0;
		}
	}
	.my-item:nth-child(1) .iconfont{
		font-size: 16px;
		background-color: #F88799;
	}
	.my-item:nth-child(2) .iconfont{
		font-size: 16px;
		background-color:#62C6FF;
	}
	.my-item:nth-child(3) .iconfont{
		background-color:#CC9CFD;
	}
	.my-item:nth-child(4) .iconfont{
		background-color:#62C6FF;
	}
	.my-item:nth-child(5) .iconfont{
		background-color:#28C689;
	}
	.my-text{
	    font-size: 14px;
	    color:#333;
	    line-height: 26px;
	}

</style>
