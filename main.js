import Vue from 'vue'

import App from './App'
import store from './store'
import http from '@/util/http'
import hasPermission from '@/util/hasPermission'
import config from '@/config.js'
import attachmentCheck from '@/components/attachment/attachment-check.vue'
import attachmentUpload from "@/components/attachment/attachment-upload.vue"
import tkiFileManager from "@/components/tki-file-manager/tki-file-manager.vue"
import IkdoTextarea from '@/components/ikdo/ikdo-textarea'
import IkdoTextareaTitle from '@/components/ikdo/ikdo-textarea-title'
import dyPicker from '@/components/dyPicker/dyPicker'

import uniSearchBar from '@/components/uni-components/uni-search-bar/uni-search-bar.vue'

Vue.component("attachmentCheck", attachmentCheck)
Vue.component("attachmentUpload", attachmentUpload)
Vue.component("tki-file-manager", tkiFileManager)
Vue.component("ikdo-textarea", IkdoTextarea)
Vue.component("ikdo-textarea-title", IkdoTextareaTitle)
Vue.component("dyPicker", dyPicker)
Vue.component("uni-search-bar", uniSearchBar)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$config = config
Vue.prototype.$http = http

Vue.mixin({
	methods: {
		hasPermission,
		fileUrl(url) {
			return config.serverHost + url;
		},
		fileRUrl(url) {
			return config.url('/r/' + url);
		}
	}
})

import util from '@/util/util.js'
for(var p in util){
	Vue.prototype[p] = util[p]
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
