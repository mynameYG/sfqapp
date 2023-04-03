<template>
	<view class="bg index-main">
		<view class="index-nav-wrap">
			<view class="index-nav-box clearfix">
				<view class="index-nav-item tc" @click="jump('/pages/service/property')">
					<view class="index-nav-bg">
						<i class="iconfont icon-weibiaoti-_huabanfuben"></i>
					</view>
					<view class="index-nav-text">物业服务</view>
				</view>	
				<view class="index-nav-item tc" @click="jump('/pages/inspection/problem')">
					<view class="index-nav-bg">
						<i class="iconfont icon-fuwu1"></i>
					</view>
					<view class="index-nav-text">政务服务</view>
				</view>
				<view  class="index-nav-item tc" @click="jump('/pages/roadStake/roadStake-list')">
					<view class="index-nav-bg">
						<i class="iconfont icon-wentishangbao"></i>
					</view>
					<view class="index-nav-text">学习交流</view>
				</view>
				<view class="index-nav-item tc" @click="jump('/pages/handle/handle')">
					<view class="index-nav-bg">
						<i class="iconfont icon-daibanshixiang"></i>
					</view>
					<view class="index-nav-text">党群服务</view>
				</view>
				<view class="index-nav-item tc" @click="jump('/pages/meeting/meeting')">
					<view class="index-nav-bg">
						<i class="iconfont icon-tongzhigonggao1"></i>
					</view>
					<view class="index-nav-text">通知公告</view>
				</view>
				
				<view class="index-nav-item tc" @click="jump(`/pages/service/clapper`)">
					<view class="index-nav-bg">
						<i class="iconfont icon-xingzhuang"></i>
					</view>
					<view class="index-nav-text">拍客</view>
				</view>
				<view class="index-nav-item tc" @click="jump('/pages/video/video')">
					<view class="index-nav-bg">
						<i class="iconfont icon-daibanshixiang1"></i>
					</view>
					<view class="index-nav-text">健身预约</view>
				</view>			
				<view class="index-nav-item tc" @click="jump(`/pages/dataAnalysis/dataAnalysis`)">
					<view class="index-nav-bg">
						<i class="iconfont icon-shujufenxi"></i>
					</view>
					<view class="index-nav-text">健康养老</view>
				</view>
				<view class="index-nav-item tc" @click="jump('/pages/contact/contact')">
					<view class="index-nav-bg">
						<i class="iconfont icon-jianshenfang"></i>
					</view>
					<view class="index-nav-text">全民健身</view>
				</view>
				<view class="index-nav-item tc" @click="jump('/pages/contact/contact')">
					<view class="index-nav-bg">
						<i class="iconfont icon-daoluxinxi"></i>
					</view>
					<view class="index-nav-text">绿色出行</view>
				</view>
				<view class="index-nav-item tc" @click="jump('/pages/contact/contact')">
					<view class="index-nav-bg">
						<i class="iconfont icon-yiliaoweisheng"></i>
					</view>
					<view class="index-nav-text">医疗卫生</view>
				</view>
				<view class="index-nav-item tc" @click="jump('/pages/contact/contact')">
					<view class="index-nav-bg">
						<i class="iconfont icon-jiaoyu"></i>
					</view>
					<view class="index-nav-text">教育教学</view>
				</view>
				<view class="index-nav-item tc" @click="jump('/pages/contact/contact')">
					<view class="index-nav-bg">
						<i class="iconfont icon-xiaofei"></i>
					</view>
					<view class="index-nav-text">便捷消费</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.index-main{
		top: 0px !important;
		padding:15px;
		/* #ifdef H5 */
		padding-top: 60px;
		/* #endif */
		/* #ifndef H5 */
		padding:80px 15px 15px;
		/* #endif */
		/* #ifdef APP-PLUS */
		padding-bottom:50px;
		/* #endif */
		
	}
	.index-nav-wrap{
		margin:0 -15px;
		.index-nav-box{
			border-radius: 5px;
			margin-top: 15px;
			width: 100%;
			.index-nav-bg{
				display: inline-block;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				color: #fff;
				position: relative;
				margin-bottom: 5px;
				i.iconfont{
					margin-top: 10px;
					display: block;
					font-size:26px;
					font-weight:500;
				}
				text{
					width: 6px;
					height: 6px;
					background-color: #FF0000;
					border-radius: 50%;
					position: absolute;
					top: 0;
					right: -10px;
				}
			}
			.index-nav-text{
				line-height: 25px;
				font-size: 14px;
				color: #333;
			}
		}
		.index-nav-item{
			float: left;
			width: 25%;
			margin-bottom: 10px;
		}
		.index-nav-item:nth-child(1){
			.index-nav-bg{
				background: linear-gradient(to bottom, #F9717B 0, #F55B59 100%);
			}
		}
		.index-nav-item:nth-child(2){
			.index-nav-bg{
				background: linear-gradient(to bottom, #ACE756 0, #56D027 100%);
			}
		}
		.index-nav-item:nth-child(3){
			.index-nav-bg{
				background: linear-gradient(to bottom, #8F8FF9 0, #7A7AEE 100%);
			}
		}
		.index-nav-item:nth-child(4){
			.index-nav-bg{
				background: linear-gradient(to bottom, #2FD8CB 0, #2AC3B5 100%);
			}
		}
		.index-nav-item:nth-child(5){
			.index-nav-bg{
				background: linear-gradient(to bottom, #79DEC0 0, #5FC1A3 100%);
			}
		}
		.index-nav-item:nth-child(6){
			.index-nav-bg{
				background: linear-gradient(to bottom, #7AB2F9 0, #2A76F9 100%);
			}
		}
		.index-nav-item:nth-child(7){
			.index-nav-bg{
				background: linear-gradient(to bottom, #FABD4F 0, #F99A29 100%);
			}
		}
		.index-nav-item:nth-child(8){
			.index-nav-bg{
				background: linear-gradient(to bottom, #FBA2A7 0, #FC5C65 100%);
			}
		}
		.index-nav-item:nth-child(9){
			.index-nav-bg{
				background: linear-gradient(to bottom, #ACE756 0, #56D027 100%);
			}
		}
		.index-nav-item:nth-child(10){
			.index-nav-bg{
				background: linear-gradient(to bottom, #8F8FF9 0, #7A7AEE 100%);
			}
		}
		.index-nav-item:nth-child(11){
			.index-nav-bg{
				background: linear-gradient(to bottom, #2FD8CB 0, #2AC3B5 100%);
			}
		}
		.index-nav-item:nth-child(12){
			.index-nav-bg{
				background: linear-gradient(to bottom, #FABD4F 0, #F99A29 100%);
			}
		}
		.index-nav-item:nth-child(13){
			.index-nav-bg{
				background: linear-gradient(to bottom, #2FD8CB 0, #2AC3B5 100%);
			}
		}
	}
</style>
