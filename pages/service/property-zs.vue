<template>
	<view>
		<view class="about-top">
			<view v-for="(item,index) in list" :key="item.id" class="about-top-con"
			:class="tapIndex == index ? 'on' : ''"
			@tap="showCoent(item.id,index)"
			>
				<p>{{item.title}}</p>
			</view>
		</view>
		<!-- <view class="about-bottom">
			务审批、行政办公、知识管理等功能模块。支持校内各种信息资源的查询；支持Android和IOS两种版本。
		</view> -->
		<parser class="art-con" :html="content" :domain="fileUrl('/')"></parser>
	</view>
</template>

<script>
	import parser from '@/components/parser/index'
	export default {
		components:{
			parser
		},
		data() {
			return {
				list:[],
				tapIndex:3,
				content:""
			}
		},
		mounted(){
			this.getList();
		},
		methods:{
			getList(){
				this.$http.get(`/app/tenement/contents`).then(res => {
					this.list = res.list;
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})});
			},
			showCoent(itemId,index){
				this.$http.get(`/app/tenement/content/${itemId}`).then(res => {
					console.log('re',res)
					this.content = res.content;
					this.tapIndex = index
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})});
			}
			
		}
	}
</script>

<style lang="scss">
	.about-top{
	    .about-top-con{
	        border-bottom: 1px solid #F6F6F6;
	        padding: 20px;
	        image{
	            display: block;
	            width: 60px;
	            height: 60px;
	            border-radius: 50%;
	            margin: 0 auto 20px;
	        }
	        p{
	            font-size: 15px;
	            color:#333;
	            line-height: 26px;
	            text-align: left;
	            margin-bottom: 0;
	        }        
	    }
		.on{
			background:linear-gradient(to bottom, #7AB2F9 0, #2A76F9 100%);
			p{
				color:#fff;
			}
		}
	}
/* 	.about-bottom{
	    margin: 30px auto;
	    padding:0 15px;
	    font-size: 14px;
	    color:#333;
	    line-height: 24px;
	} */
	.art-con {
		font-size: 14px;
		margin:15px 30px;
		line-height: 24px;
		/deep/ img {
			max-width: 100%;
			height:auto!important;
			max-height: auto;
			margin-top:15px;
		}
	}
</style>
