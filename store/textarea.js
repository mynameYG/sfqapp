import Vue from 'vue'

const textareaStore = {
	namespaced: true,
	state() {
		return {
			val: "",
			attrs: {
				title: '',
				placeholder: '请输入',
				maxlength: -1
			}
		}
	},
	mutations: {
		init(state, {val, attrs}){
			state.val = val;
			state.attrs = attrs;
		},
		setVal(state, val) {
			state.val = val;
		},
		removeVal(state, user) {
			state.val = "";
		}
	},
	getters: {
		getVal(state) {
			return state.val;
		},
		getAttrs(state) {
			return state.attrs;
		}
	}
}

export default textareaStore