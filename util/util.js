import config from '@/config'

import Vue from 'vue'

const util = {
	jump: function(url) {
		uni.navigateTo({
			url: url
		});
	},
	reLaunch: function(url) {
		uni.reLaunch({
			url: url
		});
	},
	//拨打电话
	call: function(phonenum){
		uni.makePhoneCall({
			phoneNumber: phonenum,
			success:(res=>{
				console.log(res)
			}),
			fail:(err=>{
				console.log('请检查电话号码是否正确')
			})
		}); 
	},
	//将数字转换成金额显示
	amountMoney: function(data){
		if (data != null) {
			return data.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') + '元';
		} else {
			return;
		}
	},
	// 节流函数
	delay: (function() {
		let timer = 0;
		return function(callback, ms) {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})(),
	/* 时间戳转时间 */
	dateFilter: function(time, type) { //type为date,返回 年-月-日数据; type为datetime,返回 年-月-日 时:分:秒 ;  type为minutes,返回时:分 
		if (time) {
			let date = new Date(time);
			let y = date.getFullYear();
			let MM = date.getMonth() + 1;
			MM = MM < 10 ? ('0' + MM) : MM;
			let d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			let h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			let m = date.getMinutes();
			m = m < 10 ? ('0' + m) : m;
			let s = date.getSeconds();
			s = s < 10 ? ('0' + s) : s;
			if (type == "date") {
				return y + '-' + MM + '-' + d;
			} else if (type == "dateminutes") {
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m;
			} else if (type == "dayminutes") {
				return MM + '-' + d + ' ' + h + ':' + m;
			}else if (type == "datesecond") {
				return MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			} else if (type == "minutes") {
				return h + ':' + m;
			} else if (type == "month") {
				return MM;
			}else if (type == "second") {
				return h + ':' + m + ':' + s;
			} else {
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			}
		} else {
			return "";
		}
	},
	/* 附件上传 判断类型 */
	matchType: function(fileName) {
		// 后缀获取
		var suffix = '';
		// 获取类型结果
		var result = '';
		try {
			var flieArr = fileName.toLowerCase().split('.');
			suffix = flieArr[flieArr.length - 1];
		} catch (err) {
			suffix = '';
		}
		// fileName无后缀返回 false
		if (!suffix) {
			result = false;
			return result;
		}
		// 图片格式
		var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
		// 进行图片匹配
		result = imglist.some(function(item) {
			return item == suffix;
		});
		if (result) {
			result = 'image';
			return result;
		};
		// 匹配txt
		var txtlist = ['txt'];
		result = txtlist.some(function(item) {
			return item == suffix;
		});
		if (result) {
			result = 'txt';
			return result;
		};
		// 匹配 excel
		var excelist = ['xls', 'xlsx'];
		result = excelist.some(function(item) {
			return item == suffix;
		});
		if (result) {
			result = 'excel';
			return result;
		};
		// 匹配 word
		var wordlist = ['doc', 'docx'];
		result = wordlist.some(function(item) {
			return item == suffix;
		});
		if (result) {
			result = 'word';
			return result;
		};
		// 匹配 pdf
		var pdflist = ['pdf'];
		result = pdflist.some(function(item) {
			return item == suffix;
		});
		if (result) {
			result = 'pdf';
			return result;
		};
		// 匹配 ppt
		var pptlist = ['ppt', 'pptx'];
		result = pptlist.some(function(item) {
			return item == suffix;
		});
		if (result) {
			result = 'ppt';
			return result;
		};
		// 匹配 视频
		var videolist = ['mp4', 'm2v', 'mkv'];
		result = videolist.some(function(item) {
			return item == suffix;
		});
		if (result) {
			result = 'video';
			return result;
		};
		// 匹配 音频
		var radiolist = ['mp3', 'wav', 'wmv'];
		result = radiolist.some(function(item) {
			return item == suffix;
		});
		if (result) {
			result = 'radio';
			return result;
		}
		// 其他 文件类型
		result = 'other';
		return result;
	},
	//文件类型
	typeJson: {
		'image': 'png/jpg/jpeg/bmp/gif',
		'docx': 'docx',
		'pdf': 'pdf',
		'excel': 'xls/xlsx',
		'txt': 'txt',
		'ppt': 'ppt'
	},
	docxType: function(fileName) {
		// 后缀获取
		var suffix = '';
		// 获取类型结果
		var result = '';
		try {
			var flieArr = fileName.toLowerCase().split('.');
			suffix = flieArr[flieArr.length - 1];
		} catch (err) {
			suffix = '';
		}
		// fileName无后缀返回 false
		if (!suffix) {
			result = false;
			return result;
		}
		// 匹配 word
		var wordlist = ['docx'];
		result = wordlist.some(function(item) {
			return item == suffix;
		});
		if (result) {
			result = 'docx';
			return result;
		};
		// 匹配 pdf
		var pdflist = ['pdf'];
		result = pdflist.some(function(item) {
			return item == suffix;
		});
		if (result) {
			result = 'pdf';
			return result;
		};
	},
	openFileManager: function(file, domRef, type) {
		// TODO 苹果手机目前只支持上传图片,不支持其他格式文件
		if (plus.os.name.toLowerCase() != "android") {
			if (type && type != 'image') {
				uni.showToast({
					title: 'ios平台暂不支持' + this.typeJson[type] + '格式',
					icon: 'none'
				});
			} else {
				uni.chooseImage({
					success: (res) => {
						console.log('res', res)
						this.$http.uploadFile({
							filePath: res.tempFilePaths[0]
						}).then(data => {
							console.log('data', data)
							file.push({
								fileName: data.orginName,
								filePath: data.path,
								url: data.downloadUrl,
								orginName: data.orginName,
								downloadUrl: config.serverHost + data.url,
								fileType: this.matchType(data.orginName)
							})
							console.log('file', JSON.stringify(file))
							console.log('file', file.downloadUrl)
						}).catch(err => {
							uni.showToast({
								title: err,
								icon: 'none'
							})
						});
					}
				})
			}
	
		} else {
			this.$refs[domRef || 'filemanager']._openFile()
		}
	},
	
	// 安卓上传附件
	resultPath: function(e, file, fileNum, type) { //1.e代表组件返回路径 2.file上传的文件信息 3.fileNum(代表上传单张还是多张)默认为上传多个附件,  值为single时代表只能上传一个附件
		var self = this;
		if (fileNum == "single" && file.length > 0) {
			file.length = 0;
		}
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			self.$http.uploadFile({
				filePath: entry.toLocalURL()
			}).then(data => {
				if (type) {
	
					// console.log('type:', type);
					// console.log('data:', JSON.stringify(data));
					// console.log('self.docxType(data.orginName):', self.docxType(data.orginName), type);
	
					// console.log('typeJson[type]:', typeJson[type]);
					if (self.docxType(data.orginName) !== type) {
						uni.showToast({
							title: "请上传" + this.typeJson[type] + '格式文件',
							icon: 'none'
						})
					} else {
						file.push({
							fileName: data.orginName,
							filePath: data.path,
							url: data.downloadUrl,
							orginName: data.orginName,
							downloadUrl: config.serverHost + data.url,
							fileType: self.matchType(data.orginName)
						})
					}
				} else {
					file.push({
						fileName: data.orginName,
						filePath: data.path,
						url: data.downloadUrl,
						orginName: data.orginName,
						downloadUrl: config.serverHost + data.url,
						fileType: self.matchType(data.orginName)
					})
				}
				//console.log(file.downloadUrl)
			}).catch(err => {
				uni.showToast({
					title: err,
					icon: 'none'
				})
			});
		}, function(error) {
			uni.showToast({
				title: error,
				icon: 'none'
			})
		});
	},
	deleteFile: function(file, index) {
		file = file.splice(index, 1);
	},
	
	/* 打开附件 */
	openFile: function(url) {
		uni.downloadFile({
			url: config.serverHost + url,
			success: function(res) {
				var filePath = res.tempFilePath;
				uni.openDocument({
					filePath: filePath,
					success: function(res) {
						/* uni.showToast({title: "打开成功",icon: 'none'}) */
					},
					fail() {
						uni.showToast({
							title: "打开失败",
							icon: 'none'
						})
					}
				});
			}
		});
	},
	/* 图片预览 */
	preview: function(currentUrl, previewImgList) {
		uni.previewImage({
			urls: previewImgList,
			current: currentUrl
		})
	},
	
	// 获取当前的页面栈
	pageBack: function(fun, param) {
		let pages = getCurrentPages();
		if (pages.length > 1) {
			// 获取上一级页面，即pageA的page对象
	
			let callback = pages[pages.length - 2].$vm[fun];
			callback && callback(param);
		}
	
		setTimeout(() => {
			uni.navigateBack({
				delta: 1
			});
		}, 500);
	}
	
}

export default util;