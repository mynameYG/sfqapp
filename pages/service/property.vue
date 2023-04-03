<template>
	<view class="bg">
		<view class="my-nav p15 whiteBg no-pb">
			<view class="my-item flex flexmid arrow" @tap="jump('/pages/service/property-zs')">
				<text class="iconfont icon-weibiaoti-_huabanfuben"></text>
				<text class="my-text flex1">物业展示</text>
			</view>
			<view class="my-item flex flexmid arrow" @tap="jump('/pages/service/repair-index')">
				<text class="iconfont icon-bianji"></text>
				<text class="my-text flex1">在线报修</text>
			</view>
			<view class="my-item flex flexmid arrow" @tap="jump('/pages/service/property-cost')">
				<text class="iconfont icon-wuyejiaofei"></text>
				<text class="my-text flex1">物业费</text>
			</view>
			<view class="my-item flex flexmid arrow" @tap="jump('/pages/service/vote')">
				<text class="iconfont icon-shujufenxi"></text>
				<text class="my-text flex1">在线投票</text>
			</view>
			<view class="my-item flex flexmid arrow" @tap="jump('/pages/')">
				<text class="iconfont icon-fuwu"></text>
				<text class="my-text flex1">意见反馈</text>
			</view>
			<view class="my-item flex flexmid arrow" @tap="jump('/pages/')">
				<text class="iconfont icon-menzhenjiaofei"></text>
				<text class="my-text flex1">在线缴费</text>
			</view>
		</view>
	</view>
</template>

<script>
	
</script>

<style lang="scss">
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
		background-color:#7A7AEE;
	}
	.my-item:nth-child(5) .iconfont{
		background-color:#28C689;
	}
	.my-item:nth-child(6) .iconfont{
		background-color:#56D027;
	}
	.my-text{
	    font-size: 14px;
	    color:#333;
	    line-height: 26px;
	}

</style>
