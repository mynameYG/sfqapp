import config from '@/config'

import Vue from 'vue'

class Http {
	constructor() {
		this.debug = false;
		this.lastLoginTime = 0; // 记录最后一次跳转登录时间，5分钟内只跳转一次
		this.lastRequestTime = 0;
		this.lastRequestUrl = "";
	}
	uploadFile(params){
		let http = this;
		params.url = config.url('/fboot/upload/file');
		params.name = 'file';
		params.header = {
			...params.header,
			'x-requested-with': 'XMLHttpRequest'
		}
		try{
			params.header.Authorization = getApp().globalData.user.token;
		}catch(e){
		}
		this.debug && console.debug('upload', params.url, params.header.Authorization);
		let promise = new Promise((resolve, reject) => {
			uni.showLoading();
			uni.uploadFile({
				...params,
				success: function({data, statusCode}){
					uni.hideLoading();
					switch (statusCode){
					case 200:
						data = eval('(' + data + ')');
						switch (data.code){
							case 0:
								resolve(data.data);
								break;
							default:
								//console.log('err: ', data, statusCode);
								reject(data.msg);
								break;
						}
						break;
					case 401:
						let date = new Date().getTime();
						if(date - http.lastLoginTime > 1000 * 60 * 5){
							http.lastLoginTime = date;
							uni.navigateTo({
								url: config.loginUrl,
								animationType: 'slide-in-right'
							});
						}
						break;
					default:
						uni.showToast({
							icon: 'none',
							title: '服务器异常，请联系管理员！'
						});
						break;
					}
				},
				fail: function(err){
					uni.showToast({
						icon: 'none',
						title: '连接服务器失败'
					});
				},
				complete: function(){
					//uni.hideLoading();
				}
			});
		});
		return promise;
	}
	ajax(url, method, data) {
		let http = this;
		if(method != 'GET'){
			let time = new Date().getTime();
			// 统一请求,2秒内多次重复提交,予以拦截.
			if(time - this.lastRequestTime < 1000 * 2 && this.lastRequestUrl == url){
				console.log("url 重复请求.", url, method);
				return new Promise((resolve, reject) => {
					// TODO 
				});
			}
			this.lastRequestTime = time;
			this.lastRequestUrl = url;
		}
		let promise = new Promise((resolve, reject) => {
			method != 'GET' && uni.showLoading();
			let header = {'x-requested-with': 'XMLHttpRequest'};
			try{
				header.Authorization = getApp().globalData.user.token;
			}catch(e){
			}
			this.debug && console.debug('http', config.url(url), header.Authorization, data);
			uni.request({
				url: config.url(url),
				method,
				data,
				header: header,
				success: function(res) {
					let {data, statusCode} = res;
					this.debug && console.debug('response', res)
					method != 'GET' && uni.hideLoading();
					switch (statusCode){
						case 200:
							// console.log("200");
							switch (data.code){
								case 0:
									resolve(data.data);
									break;
								default:
									if (data.code > 20200101) {
										reject({
											code: data.code,
											msg: data.msg,
											toast: function(msg) {
												uni.showToast({
													icon: 'none',
													title: msg
												});
											}
										});
									} else {
										uni.showToast({
											icon: 'none',
											title: data.msg
										});
									}
									
									break;
							}
							break;
						case 404: // 404处理
							//console.log("404", url);
							
							if(data.msg = '业主信息不存在！'){
								console.log('data.msg',data)
								uni.showToast({
									icon: 'none',
									title: '业主信息不存在，请先去注册！'
								});
								return;
							}
							uni.showToast({
								icon: 'none',
								title: '请求数据失败，链接不存在！'
							});
							break;
						case 403: // 403无权限
							//console.log("403");
							uni.showToast({
								icon: 'none',
								title: '数据访问权限不足，请联系管理员！'
							});
							break;
						case 401:
							//console.log("401");
							let date = new Date().getTime();
							if(date - http.lastLoginTime > 1000 * 60 * 5){
								http.lastLoginTime = date;
								uni.navigateTo({
									url: config.loginUrl,
									animationType: 'slide-in-right'
								});
							}
							break;
						default:
							//console.log("default");
							uni.showToast({
								icon: 'none',
								title: '服务器异常，请联系管理员！'
							});
							break;
					}
				},
				fail: function(err) {
					method != 'GET' && uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: '连接服务器失败'
					});
				},
				complete: function(){
				}
			})
		});
		
		return promise;
	}
	
	get(url, data = {}) {
		return this.ajax(url, 'GET', data);
	}
	
	post(url, data = {}) {
		return this.ajax(url, 'POST', data);
	}
	
	put(url, data = {}) {
		return this.ajax(url, 'PUT', data);
	}
	
	del(url, data = {}, responseError = false) {
		return this.ajax(url, 'DELETE', data, responseError);
	}
}

export default new Http();
