<script>
	// import '@/static/font/iconfont.css';
	import Vue from 'vue';
	import upgrade from '@/util/upgrade';
	import { mapMutations } from 'vuex'
	
	export default {
		globalData: {
			user: {}
		},
		onLaunch: function() {
			console.log('App Launch');
			this.loadUserFromStorage();
			// #ifdef H5
			upgrade.check();
			// #endif
			if(process.env.NODE_ENV !== 'development'){
				upgrade.check();
			}
			
			// 处理推送消息
			this.handlePush();
			
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary') //竖屏正方向
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['loadUserFromStorage']),
			handlePush() {
				// #ifdef APP-PLUS
				const _self = this
				const _handlePush = function(message) {
					// 获取自定义信息
					//console.log('message', message);
					//console.log('this.$store.state.hasLogin',_self.$store.state.hasLogin);
					let item = JSON.parse(message.content)
					var moduleId = item.moduleId;
					var bussinessId = item.bussinessId;
					var urlJson = {
							'event-accept': `/pages/problem/problem-detail-accept?id=${bussinessId}`,//事件受理
							'event-handle': `/pages/problem/problem-detail?id=${bussinessId}`,//事件
							'event-inspect': `/pages/problem/problem-detail?id=${bussinessId}`,//事件
							'event-audit': `/pages/problem/problem-detail?id=${bussinessId}`,//事件
							'event-press': `/pages/problem/problem-detail?id=${bussinessId}`,//事件
							//'ducha': "/pages/apply/tasksignfor/signfor",//督查督办
							//'fboot-wf-undo': "/pages/index/task/task"    //工作待办
							'notice': `/pages/index/notice/notice-detail?id=${bussinessId}`,//通知公告
						} 
					// 判断是否登录
					if(_self.$store.state.hasLogin){
						if(urlJson[moduleId]){
							uni.navigateTo({
								url: '/pages/notice/notice-index'
							});
							/* _self.$http.put(`/notify/notifyInfo/readed?businessId=${bussinessId}&moduleId=${moduleId}`).then(res =>{
								
							}) */
						}else {
							uni.switchTab({
								url: '/pages/problem/problem-index'
							});
						}
					}else{
						console.log('321',_self.$config.loginUrl)
						uni.navigateTo({
							url: _self.$config.loginUrl,
							animationType: 'slide-in-ight'
						});
					}
				}
				// 事件处理
				plus.push.addEventListener('click', _handlePush)
				plus.push.addEventListener('receive', _handlePush)
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	
	/* #ifndef APP-PLUS-NVUE */
	@import './static/font/iconfont.css';
	/*每个页面公共css */
	@import './common/common.scss';
	/* #endif */
	.placeholder {
		color: #999;
		font-size: 14px;
	}
	
	/* #ifndef APP-PLUS-NVUE */
	/deep/ .uni-searchbar__text-placeholder{
		font-size:14px;
	}
	/* #endif */
	.bg{
		// min-height: 100vh;
		background-color: #FAFAFA;
		position: fixed;
		// #ifdef APP-PLUS
		top: 0px;
		// #endif
		// #ifndef APP-PLUS
		top: 44px;
		// #endif
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1;
		/* #ifndef APP-PLUS-NVUE */
		overflow-y: auto;
		/* #endif */
	}
	/* #ifndef APP-PLUS-NVUE */
	/* 去掉所有button的外边框 */
	button::after {
		border: none;
	}
	/* #endif */
</style>
