<template>
	<view class="atts-wrap">
		<view class="atts-tt">
			<text class="atts-title" :style="{ color: color }">{{ title || '附件' }}</text>
		</view>
		<view class="atts-item" v-for="(item, index) in atts" :key="index">
			<!-- 图片 -->
			<view class="flex flexmid" v-if="item.fileType == 'image' || matchType(item.fileName) == 'image'" @click='previewImg(item.url.indexOf("?") > -1 ? (item.url.substr(0, item.url.indexOf("?"))) : item.url, previewImgList)'>
				<view class="atts-image"><image class="is-image" :src='item.url.indexOf("?") > -1 ? (item.url.substr(0, item.url.indexOf("?"))) : item.url'></image></view>
				<text class="atts-name flex1 text-ellipsis">{{ item.fileName }}</text>

				<text class="atts-download" @click.stop="downLoad(item.url)"><text class="iconfont icon-xiazai1"></text></text>
				<!-- <text class="atts-shanchu">
					<text class="iconfont icon-guanbi"></text>
				</text> -->
			</view>
			<!-- 文件 -->
			<view class="flex flexmid" v-else @click="previewOther(item.url)">
				<view class="atts-image">
					<image v-if="item.fileType == 'txt' || matchType(item.fileName) == 'txt'" class="no-image" src="/static/img/file-txt.png"></image>
					<image v-else-if="item.fileType == 'ppt' || matchType(item.fileName) == 'ppt'" class="no-image" src="/static/img/file-ppt.png"></image>
					<image v-else-if="item.fileType == 'pdf' || matchType(item.fileName) == 'pdf'" class="no-image" src="/static/img/file-pdf.png"></image>
					<image v-else-if="item.fileType == 'excel' || matchType(item.fileName) == 'excel'" class="no-image" src="/static/img/file-xls.png"></image>
					<image v-else-if="item.fileType == 'word' || matchType(item.fileName) == 'word'" class="no-image" src="/static/img/file-doc.png"></image>
					<image v-else class="no-image" src="/static/img/file-fil.png"></image>
				</view>

				<text class="atts-name flex1 text-ellipsis">{{ item.fileName }}</text>
				<text class="atts-download" @click.stop="downLoad(item.url)"><text class="iconfont icon-xiazai1"></text></text>
				<!-- <text class="atts-shanchu">
					<text class="iconfont icon-guanbi"></text>
				</text> -->
			</view>
		</view>
		<view v-if="atts.length < 1" class="empty">无{{ title || '附件' }}</view>
		<view class="progress-box" v-show="progressShow">
			<view class="progress">已下载{{progressNum || "0%"}}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		atts: {
			type: Array,
			default: () => []
		},
		previewImgList: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: () => ''
		},
		color: {
			type: String,
			default: () => ''
		}
	},
	data() {
		return {
			downloadCatalogue: this.$config.downloadCatalogue,
			progressShow:false,
			progress:0,
			progressNum:0,
			timer:null
		};
	},
	watch: {
		atts(val) {
			// this.atts = val;
		}
	},
	methods: {
		init(){
			// console.log("计时开始");
			this.progressNum = this.progress;
			this.timer = setTimeout(()=>{
				this.init();
			},300)
		},
		downLoad(url) {
			var self = this;
			self.progressShow = true;
			var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
				if (status == 200) {
					
				} else {
					alert('Download failed: ' + status);
				}
			});
			dtask.addEventListener('statechanged', onStateChanged, false);
			dtask.start();

			function onStateChanged(download, status) {
				switch(download.state) {
					case 1: // 开始  
						break;
					case 2: //已连接到服务器  
						self.init();
						break;
					case 3: // 已接收到数据  
						self.progress = Math.ceil((download.downloadedSize / download.totalSize) * 100) + "%";
						break;
					case 4: // 下载完成 
						/* console.log('Download2' + JSON.stringify(download));
						console.log(download.filename); */
						
						var saveName = download.filename.split('/')[1];
						var path = plus.io.convertLocalFileSystemURL(download.filename);
						// var t = fileUtil.copy(path.toString(), saveName, self.downloadCatalogue);
						self.progressShow = false;
						self.timer && clearTimeout(self.timer);
						self.progress = 0 + "%";
						self.progressNum = 0 + "%";
						self.timer = null;
						// plus.nativeUI.toast('文件已存储到：' + self.progressNum);
						fileShare.shareFromFile(path.toString());
						// plus.nativeUI.toast('文件已存储到：' + t.toString(), { duration: 'long' });
						
						/* plus.nativeUI.closeWaiting();
						var bts=["确定", "取消"]; 
						plus.nativeUI.confirm("下载完成，是否打开？", (e)=>{   
							if(e.index == 0){ 
								plus.runtime.openFile(download.getFileName()); 
							} 
						},"提示",bts); */ 
						break;
				}
			}
		},
		previewImg(currentUrl, previewImgList) {
			let imgList =[];
			previewImgList.forEach(item =>{
				imgList.push(item.indexOf("?") > -1 ? (item.substr(0, item.indexOf("?"))) : item)
			})
			uni.previewImage({
				urls: imgList,
				current: currentUrl
			});
		},
		previewOther(currentUrl) {
			uni.downloadFile({
				url: currentUrl,
				success: function(res) {
					var filePath = res.tempFilePath;
					// console.log('filePath:' + filePath);
					uni.openDocument({
						filePath: filePath,
						success: function(res) {
							/* uni.showToast({title: "打开成功",icon: 'none'}) */
						},
						fail() {
							uni.showToast({ title: '打开失败', icon: 'none' });
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
.atts-wrap {
	margin-bottom: 10px;
	.atts-tt {
		font-size: 14px;
		line-height: 24px;
		color:#666;
		.atts-close {
			display: inline-block;
			width: 30px;
			height: 30px;
			float: right;
			text-align: center;
			border: 1px solid #e7e7e7;
			line-height: 30px;
			margin-top: 15px;

			.icon-tianjia {
				font-size: 14px;
				color: #d7d7d7;
			}
		}
	}

	.atts-item {
		height: 60px;
		border: 1px solid #f2f2f2!important;;
		background: #fbfcfe;
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
		color: #666;
		padding: 0 5px;
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
	.empty {
		font-size: 14px;
		color: #999;
		margin-top: 5px;
	}
}
.atts-download {
	width: 50px;
	height: 60px;
	box-sizing: border-box;
	padding: 10px 0;
	text-align: center;
	.icon-xiazai1 {
		font-size: 24px;
		color: #3d9cfc;
		line-height: 40px;
	}
}
.progress-box{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 9999;
	.progress{
		background-color:rgba($color: #000000, $alpha: 0.7);
		border-radius: 6px;
		padding: 15px;
		font-size: 15px;
		color:#fff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
