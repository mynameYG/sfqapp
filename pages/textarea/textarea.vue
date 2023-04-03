<template>
	<view class="p15 w100 flex">
		<ikdo-textarea ref="textarea" class="field-textarea p10 flex1"
			:maxlength="maxlength"
			:placeholder="placeholder"
			v-model="value" focus />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:"",
				placeholder: "请输入",
				maxlength: -1,
			}
		},
		computed:{
			value: {
				get() {	
					return this.$store.getters[`${this.type}/getVal`];
				},
				set(value) {
					this.$store.commit(`${this.type}/setVal`, value);
				}
			}
		},
		onLoad(opt){
			if(opt.type){
				this.type = opt.type;
			}
		},
		mounted() {
			const attrs = this.$store.getters[`${this.type}/getAttrs`];
			if (attrs.title) {
				uni.setNavigationBarTitle({
					title:attrs.title
				})
			}
			
			this.placeholder = attrs.placeholder;
			this.maxlength = attrs.maxlength;
			
			this.$refs.textarea.setValue(this.$store.getters[`${this.type}/getVal`]);
		},
		onNavigationBarButtonTap(e) {
			uni.hideKeyboard();
			
			if(e.index == 0){
				uni.navigateBack({delta: 1});
			}else if(e.index == 1){
				setTimeout(() => {
					this.confirm();	
				}, 100);
			}
		},
		methods: {
			confirm(){
				uni.$emit(`val-${this.type}`, this.value);
				
				let pages = getCurrentPages();
				let index = 0;
				for (let page of pages) {
				  if (page.route === 'pages/textarea/textarea') {
					break;
				  }
				  index++;
				}
				uni.navigateBack({delta: pages.length - index});
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ uni-textarea{
		width: 100%;
	}
	.field-textarea{
		width: 100%;
		border:1px solid #EEEEEE;
		border-radius: 4px;
	}
</style>
