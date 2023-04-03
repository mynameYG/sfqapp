<template>
	<view class="map-wrap">
		<web-view ref="webView" :src="imp" class="webview"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id:"",
				roadName:"",
				longitude:"",
				latitude:"",
				covers: [],
				polyline:[{
					points: [],
					color: '#1D6AD6',
					width: 7,
					dottedLine: true,
					arrowLine: true
				}],
				polylinePoints:[],
				imp:''
			}
		},
		onLoad(option) {
			//this.imp = `/static/trackPlayback.html?session=${this.$store.state.user.token}&mapCenter=${this.$config.mapCenter}`
			this.id = option.id;
			let url = this.$config.url(`/patrol/query/geTrackDataByPatrolId/${this.id}`);
			url = encodeURIComponent(url);
			this.imp = `/static/trackPlayback.html?url=${url}&session=${this.$store.state.user.token}&mapCenter=${this.$config.mapCenter}`;
			console.log('this.imp',JSON.stringify(this.imp))
		},
		onNavigationBarButtonTap(e) {
			if(this.id){
				this.jump(`/pages/patrol/patrol-problem?id=${this.id}&roadName=${this.roadName}`)
				 // #ifdef APP-PLUS
				var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
				var wv = currentWebview.children()[0]
				wv.reload();
				// #endif
			}
		},
		mounted() {
		},
		methods: {
		
		}
	}
</script>

<style lang="scss">
	.map-wrap{
		width: 100%;
		// #ifdef APP-PLUS
		height: 100vh;
		// #endif
		// #ifndef APP-PLUS
		height: calc(100vh - 99px);
		// #endif
		position: relative;
	}
	.webview{
		width:100%;
		// #ifdef APP-PLUS
		height: 100vh;
		// #endif
		// #ifndef APP-PLUS
		height: calc(100vh - 44px);
		// #endif
	}
</style>
