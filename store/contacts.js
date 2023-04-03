import Vue from 'vue'

const contactsStore = {
	namespaced: true,
	state() {
		return {
			dataInfo: new Map(),
			count:0,
		}
	},
	mutations: {
		addUser(state, {user, multi = true}) {
			if(!multi){
				state.dataInfo.clear();
			}
			state.dataInfo.set(user.id, user);
			state.count += 1;
		},
		removeUser(state, user) {
			state.dataInfo.delete(user.id);
			state.count -= 1;
		},
		// 使用下面的,上面的要删除
		init(state, dataInfo) {
			state.dataInfo.clear();
			state.count = 0;
			if(typeof dataInfo !== "undefined" && dataInfo.length > 0) {
				for (let data of dataInfo) {
					state.dataInfo.set(data.id, data);
					state.count += 1;
				}
				state.count = state.dataInfo.size;
			}
		},
		put(state, {data, multi = true}) {
			if(!multi){
				state.dataInfo.clear();
				state.count = 0;
			}
			state.dataInfo.set(data.id, data);
			state.count = state.dataInfo.size;
		},
		putAll(state, dataInfo) {
			for (let data of dataInfo) {
				state.dataInfo.set(data.id, data);
			}
			state.count = state.dataInfo.size;
		},
		remove(state, data) {
			state.dataInfo.delete(data.id);
			state.count = state.dataInfo.size;
		},
	},
	getters: {
		list(state) {
			let count = state.count;
			return Array.from(state.dataInfo.values());
		},
		count(state) {
			return state.count;
		},
		ids(state) {
			let count = state.count;
			return Array.from(state.dataInfo.keys()).join(",");
		},
		names(state) {
			let count = state.count;
			let names = [];
			for (let data of state.dataInfo.values()) {
				names.push(data.name);
			}
			return names.join(",");
		}
	}
}

export default contactsStore