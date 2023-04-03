const config = {}

const initConfig = function(ip, port, contextPath="") {
	if(port != null && port != ""){
		config.serverHost = `http://${ip}:${port}`,
		config.contextPath = contextPath,
		config.signPath = `http://${ip}:${port}/fboot/sign/images`
	}else{
		config.serverHost = `http://${ip}`,
		config.contextPath = contextPath,
		config.signPath = `http://${ip}/fboot/sign/images`
	}
	
	if(process.env.NODE_ENV === 'development'){
		// #ifdef H5
		config.serverHost = '',
		config.contextPath = contextPath,
		config.signPath = `http://${ip}:${port}/fboot/sign/images`
		// #endif
	}
}

const ip = "wechat.ikdo.com.cn";
const port = "";

/* const ip = "36.134.122.102";
 const port = "9089"; */

const contextPath = "";

config.init = function() {
	return new Promise((resolve) => {
		if(process.env.NODE_ENV === 'production') {
			// #ifdef APP-PLUS
			const uniConfigPlugin = uni.requireNativePlugin('UniConfig');
			// plus.nativeUI.alert(uniConfigPlugin.get)
			if (uniConfigPlugin && uniConfigPlugin.get) {
				uniConfigPlugin.get({}, uniConfig => {
					initConfig(uniConfig.host || ip, uniConfig.port || port, uniConfig.contextPath || contextPath);
					resolve();
				});
			} else {
				initConfig(ip, port, contextPath);
				resolve();
			}
			// #endif
		} else {
			initConfig(ip, port, contextPath);
			resolve();
		}
	});
};
(async () => await config.init())()

// url处理
config.url = function(url){
	if(url.substr(0, 4) === 'http'){
		return url;
	}
	return config.serverHost + config.contextPath + url;
}
// 页面登录地址
config.loginUrl = '/pages/login/login';

config.patrolPower = [
	{
		type: 'app-patrol',
		title: '巡查',
		url: '/app/event/reported/EventByUserID/queryPage'
	},
	{
		type: 'app-patrol-see',
		title: '查看巡查',
		url: '/app/event/reported/EventByUserID/queryPage'
	}
]
config.longitude = 114.2864;
config.latitude = 35.750947;

config.mapCenter = [114.2864,35.750947]
export default config