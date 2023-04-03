<template>
	<view class="contacts-smalllist" style="margin-top: 0;">
		<view class="contacts-smalllink flex flexmid" v-for="(item, n) in datas" :key="item.id">
			<image class="contacts-smallleft" src="../../static/img/default-photo.png" mode=""></image>
			<view class="contacts-smallmid flex1 text-ellipsis">
				<view class="contacts-smallname text-ellipsis">{{item.name}}</view>
			</view>
			<view style="font-size:14px;color:#FF0000" @click="del(item, n)">移除</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: undefined,
				isOk: false,
				currPage: 0,
				datas: []
			}
		},
		onBackPress() {
			return !this.isOk;
		},
		onNavigationBarButtonTap(e) {
			this.isOk = true;
			
			if(e.index == 0) {
				this.$store.commit(`${this.type}/init`);
				uni.navigateBack({delta: 1});
			} else if(e.index == 1){
				uni.navigateBack({delta: 1});
			}
		},
		created() {
			// #ifdef APP-PLUS
			var page = this.$mp.page.$getAppWebview();
			page.setStyle({ popGesture: 'none' });
			// #endif
		},
		onLoad(opt) {
			this.type = opt.type || '';
			
			this.persons = this.$store.getters[`${this.type}/list`];
		},
		mounted() {
			this.loadData();
		},
		methods: {
			onReachBottom() {
				this.loadData();
			},
			loadData() {
				this.datas.push(...(this.persons.slice(this.currPage * 20 , (++this.currPage) * 20)));
			},
			del(item, index){
				this.$store.commit(`${this.type}/remove`, item);
				this.datas.splice(index, 1);
				if (this.datas.length < 20) {
					this.loadData();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/contacts.scss';
	/* #ifdef APP-PLUS || H5 */
	/deep/ .contacts-smalllink {
		border-radius: 50% !important;
		margin-left:0;
	}
	/* #endif */
	.contacts-smallleft{
		margin-left: 0;
	}
	.contacts-blue{
		color:#3D9CFC;
	}
</style>
