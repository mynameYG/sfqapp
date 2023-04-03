<template>
	<view>
		<view class="atts-item"  v-for="(item,index) in fileList" :key="index">
			<!-- 图片 -->
			<view class="flex" v-if="item.fileType == 'image' || matchType(item.fileName) == 'image'">
				<view class="atts-image">
					<image class="is-image" :src="fileRUrl(item.filePath)"></image>
				</view>
				<text class="atts-name flex1 text-ellipsis">{{item.fileName}}</text>
				<text class="atts-shanchu" @click="del(index)">
					<text class="iconfont icon-shanchu"></text>
				</text>
			</view>
			<!-- 文件 -->
			<view class="flex" v-else>
				<view class="atts-image">
					<image v-if="item.fileType == 'txt' || matchType(item.fileName) == 'txt'" class="no-image" src="/static/img/file-txt.png"></image>
					<image v-else-if="item.fileType == 'ppt' || matchType(item.fileName) == 'ppt'" class="no-image" src="/static/img/file-ppt.png"></image>
					<image v-else-if="item.fileType == 'pdf' || matchType(item.fileName) == 'pdf'" class="no-image" src="/static/img/file-pdf.png"></image>
					<image v-else-if="item.fileType == 'excel' || matchType(item.fileName) == 'excel'" class="no-image" src="/static/img/file-xls.png"></image>
					<image v-else-if="item.fileType == 'word' || matchType(item.fileName) == 'word'" class="no-image" src="/static/img/file-doc.png"></image>
					<image v-else class="no-image" src="/static/img/file-fil.png"></image>
				</view>							
				<text class="atts-name flex1 text-ellipsis">{{item.fileName}}</text>
				<text class="atts-shanchu" @click="del(index)">
					<text class="iconfont icon-shanchu"></text>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			file: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				fileList:[]
			};
		},
		watch:{
			file(val){
				if(val){
					this.fileList = val;
				}
			},
			fileList(newVal, oldValue){
				this.$emit("getFile", newVal);
			}
		},
		methods: {
			del(index){
				this.fileList = this.fileList.splice(index, 1);
				// console.log(JSON.stringify(this.fileList));
				setTimeout(()=>{
					this.$emit("getFile", this.fileList);
				},50)
			}
		}
	}
</script>

<style lang="scss">
	.atts-item {
		height: 60px;
		border: 1px solid #F2F2F2!important;
		background: #FBFCFE;
		margin-top: 10px;
		border-radius: 5px;

		.atts-image {
			width: 60px;
			height: 60px;
			padding: 10px;
		}

		.no-image {
			max-width: 40px;
			max-height: 40px;
			border: none;
			box-shadow: none;
		}

		.is-image {
			width: 40px;
			height: 40px;
			border: none;
			box-shadow: none;
		}
	}

	.atts-name {
		font-size: 14px;
		line-height: 60px;
		color:#666;
		max-width: calc(100% -200px);
	}

	.atts-shanchu {
		display: inline-block;
		width: 50px;
		height: 30px;
		margin-top: 15px;
		text-align: center;

		.icon-guanbi {
			font-size: 16px;
			color: #999999;
		}
	}
</style>
