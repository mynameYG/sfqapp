<template>
	<view>
		<city-select
			placeholder="请输入区域名"
			@cityClick="cityClick"
			:formatName="formatName"
			:formatDesc='formatDesc'
			:indexCode="indexCode"
			:indexName="indexName"
			:obtainCitys="obtainCitys"
			:isSearch="true"
		></city-select>
	</view>
</template>

<script>
import citySelect from '@/components/city-select/city-select.vue';
export default {
	data() {
		return {
			//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
			formatName: 'name',
			formatDesc: 'id',
			indexCode: 'id',
			indexName: 'name',
			//显示的城市数据
			obtainCitys:[]
		};
	},
	components: {
		citySelect
	},
	onLoad() {},
	mounted(){
		this.init();
	},
	methods: {
		init(){
			this.getTypes();
		},
		getTypes(){
			this.$http.get(`/app/pub/street`).then(res => {
				console.log('res',res)
				this.obtainCitys = res;
				// console.log('this.community',this.obtainCitys)
			})
		},
		cityClick(item) {
			// console.log('item',item)
			uni.setStorageSync('checkGridId',item.id);
			let pages = getCurrentPages();
			let index = 0;
			for (let page of pages) {
			  if (page.route === 'pages/contacts/person-contacts') {
				break;
			  }
			  index++;
			}
			
			uni.navigateBack({delta: pages.length - index});
			/* uni.showToast({
				icon: 'none',
				title: 'item: ' + JSON.stringify(item),
				// #ifdef MP-WEIXIN
				duration: 3000,
				// #endif
				mask: true
			}); */
		}
	}
};
</script>

<style lang="scss">
	
</style>
