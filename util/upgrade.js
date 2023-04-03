import config from '@/config'
import Vue from 'vue'
/**
 * APP 版本更新
 * 注: 只支持Android
 */
class Upgrade {
	constructor() {
		this.debug = false;
		// #ifdef APP-PLUS
		// if (uni.getSystemInfoSync().platform != "android") {
		// 	throw "Only Support Android!";
		// }
		this.appid = plus.runtime.appid;
		// #endif
	}
	/**
	 * 查看最新版本
	 */
	lastedVersion(){
		// #ifdef APP-PLUS
		// 检查版本url
		let url = config.url("/pub/apk/" + this.appid + "/version");
		return new Promise((resolve) => {
			Vue.prototype.$http.get(url).then(result => {
				this.debug && console.log('lasted version', result);
				resolve(result);
			});
		});
		// #endif
	}
	/**
	 * 获取当前安装版本
	 */
	currentVersion(){
		// #ifdef APP-PLUS
		return new Promise((resolve) => {
			plus.runtime.getProperty(this.appid, function(inf){
				this.debug && console.log('current version', inf);
				resolve(inf.version);
			});
		});
		// #endif
	}
	/**
	 * 下载更新文件
	 * @param {Object} appinfo 新版本app信息
	 * @param String version 新版本信息
	 * @param String appVersion 当前版本信息
	*/
	download(appinfo, version, appVersion){
		return new Promise((resolve, reject) => {
			let txt = appinfo.name + '有新版本(' + version + ')更新,点击确定下载更新！';
			plus.nativeUI.alert(txt, event => {
				// 新版本下载url
				let url = config.url("/pub/apk/upgrade/" + this.appid + "/" + appinfo.filename);
				let arr = appVersion.split(".");
				url += "?major=" + arr[0];
				url += "&minor=" + arr[1];
				
				var ProgressDialog = plus.android.importClass("android.app.ProgressDialog");
				var dialog = ProgressDialog.show(plus.android.runtimeMainActivity(), "正在更新", "开始下载……");
				dialog.show();
				// uni.showLoading({
				// 	title: '开始下载……',
				// 	mask: true,
				// });
				this.debug && console.log("download url: ", url);
				let downloadTask = uni.downloadFile({
					url:url,
					success: (downloadResult) => {
						this.debug && console.log("downloaded", downloadResult);
						if (downloadResult.statusCode === 200) {
							clearLoading();
							resolve(downloadResult.tempFilePath);
						}
					},
					fail: (e) => {
						clearLoading();
						reject(e);
					}
				});
				let progress = 0, timer = null;
				downloadTask.onProgressUpdate(res => {
					progress = res.progress;
				});
				function clearLoading(){
					timer && clearTimeout(timer);
					// uni.hideLoading();
					dialog.dismiss();
				}
				function showProgress(){
					dialog.setMessage('下载进度: ' + progress + '%');
					if(progress < 100){
						timer = setTimeout(showProgress, 800);		
					}
				}
				showProgress();
			});
		});
	}
	/**
	 * 安装更新文件
	 * @param {Object} path 下载的新版本信息:apk,wgt
	 */
	install(path){
		// #ifdef APP-PLUS
		uni.showLoading({
			title: "正在安装……"
		});
		plus.runtime.install(path, {
			force: false
		}, (widgetInfo) => {
			uni.hideLoading();
			this.debug && console.log('install success', widgetInfo);
			plus.nativeUI.alert("更新成功, 点击重启应用!", e => {
				plus.runtime.restart();
			});
		}, (e) => {
			uni.hideLoading();
			this.debug && console.log('安装失败', e);
			plus.nativeUI.alert("安装失败: " + e.message);
			plus.io.resolveLocalFileSystemURL(path, entry => {
				console.log('安装失败, 删除文件:', entry.fullPath);
				entry.remove(s => {
					console.log('删除成功');
				}, err => {
					console.log('error', err);
				});
			})
		});
		// #endif
	}
	/**
	 * 检查新版本信息,并更新
	 */
	async check(source){
		console.log('source',source)
		// #ifdef APP-PLUS
		await config.init();
		this.lastedVersion().then(appinfo => {
			var version = appinfo.major + '.' + appinfo.minor;
			console.log('version',version)
			this.currentVersion().then(appVersion => {
				console.log('appVersion',appVersion)
				if(version != appVersion){
					this.debug && console.log("开始下载最新版本", version);
					plus.nativeUI.toast("当前版本: " + appVersion);
					this.download(appinfo, version, appVersion).then(path => {
						this.install(path);
					}).catch(err => {
						console.log('download error!', err);
					});
				} else {
					if(source == "myUpdate"){
						plus.nativeUI.alert("已是最新版本!");
					}
					this.debug && console.log("已是最新版本!");
				}
			})
		});
		// #endif
	}
}

export default new Upgrade()
