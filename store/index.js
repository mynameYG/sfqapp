import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		hasLogin: false,
		user: {
			id: '',
			username: '',
			nickname: '',
			sessionId: ''
		},
		resources: {} //拥有权限
	},
	mutations: {
		login(state, {
			user,
			resources
		}) {
			state.user = user;
			state.resources = resources;
			state.hasLogin = true;
			getApp().globalData.user = user;
			uni.setStorageSync('userinfo', {
				user,
				resources,
				hasLogin: true
			});
		},
		setResources(state, {resources}) {
			state.resources = resources;
			uni.setStorageSync('userinfo', {
				user: state.user,
				resources,
				hasLogin: true
			});
		},
		loadUserFromStorage(state) {
			let {
				user,
				resources,
				hasLogin
			} = uni.getStorageSync("userinfo");
			if (user) {
				state.user = user;
				state.resources = resources;
				state.hasLogin = hasLogin;
			}
			getApp().globalData.user = user;
		},
		logout(state) {
			state.user = {
				id: '',
				username: '',
				nickname: '',
			};
			state.resources = {};
			state.hasLogin = false;
			uni.removeStorageSync("userinfo");
		},
	},
	actions: {
		logout() {
			Vue.prototype.$http.get('/logout').then(() => {
				this.commit("logout");
			});
		}
	},
	getters: {
		showNickname(state) {
			return state.user.nickname;
		},

		getProjectName: state => state.projectName,
		getProjectEnglish: state => state.projectEnglish

	},
})
export default store
