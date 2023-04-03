<template>
	<view class="yh-bg">
		<view class="p15">
			<view class="whiteBg-opacity p15 radius6">
				<view class="field-title fs16">{{news.title}}</view>
				<view class="field-light mt10 mb10">{{dateFilter(news.publishTime,'dateminutes')}}</view>
				<parser class="art-con" :html="content" :domain="fileUrl('/')"></parser>
				<view class="mt10">
					<attachmentCheck v-if="file.length>0" :atts="file" :previewImgList="previewImgList"></attachmentCheck>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import parser from '@/components/parser/index'
	
	export default {
		data() {
			return {
				id:"",
				unread:"",
				news:{},
				file: [],
				previewImgList:[],
				content:""
			}
		},
		components:{
			parser
		},
		onLoad(option) {
			this.id = option.id;
			this.unread = option.unread;
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.$http.get(`/app/oa/news/${this.id}?unread=${this.unread}`).then(res => {
					this.news = res.news;
					this.content = res.content;
					for (var i = 0; i < res.files.length; i++) {
						if(res.files[i].fileType == 'image' || this.matchType(res.files[i].fileName) == 'image'){
							this.previewImgList.push(this.fileUrl(res.files[i].url))
						}
						this.file.push({
							url:this.fileUrl(res.files[i].url),
							fileName:res.files[i].fileName,
							fileType:res.files[i].fileType
						})
					}
					
					if (this.unread === 'true') {
						let pages = getCurrentPages();
						if(pages.length > 1){
							// 获取上一级页面，即pageA的page对象
							let callback = pages[pages.length - 2].$vm['loadData'];
							callback && callback('refresh');
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.art-con {
		font-size: 14px;
		margin-top: 15px;
		line-height: 24px;
		/deep/ img {
			max-width: 100%;
			height:auto!important;
			max-height: auto;
			margin-top:15px;
		}
	}
</style>
