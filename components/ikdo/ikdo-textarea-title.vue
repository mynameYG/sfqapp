<template>
	<view class="tr" @click="choose()">
		<text class="title-model" v-if="value">
			{{value || ''}}
		</text>
		<text class="title-model" style="color:#909090;" v-else>
			{{placeholder || '请输入'}}
		</text>
	</view>
</template>

<script>
	import textareaStore from "@/store/textarea"
	export default {
		props: {
			type:String,
			title: String,
			value: String,
			placeholder: String,
			maxlength: {
				type: Number,
				default: -1
			}
		},
		created() {
			this.$store.registerModule(`${this.type}`, textareaStore);
			
			uni.$on(`val-${this.type}`, data => {
				this.$emit("input", data);
			})
		},
		destroyed() {
			this.$store.unregisterModule(`${this.type}`);
		},
		methods: {
			choose(){
				this.$store.commit(`${this.type}/init`, {
					val: this.value,
					attrs: {
						title: this.title,
						placeholder: this.placeholder,
						maxlength: this.maxlength
					}
				});
				
				uni.navigateTo({
					url: `/pages/textarea/textarea?type=${this.type}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tr{
		text-align:right;
		.title-model{
			display: inline-block;
			font-size: 14px;
			color:#666;
			line-height: 24px;
			text-align: left;
			
		}
	}
	.txt-wrap{
		background-color: rgba(0,0,0,0.5);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
	}
	.txt-box{
		background-color: #fff;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.txt-top view{
		font-size: 17px;
		color:#333;
	}
	.txt-top text{
		font-size: 17px;
		color:#999;
		line-height: 45px;
		padding: 0 14px;
	}
	.txt-top text:nth-of-type(2){
		color:#007AFF;
	}
	.textarea-con-wrap{
		padding: 15px;
	}
	.textarea-con{
		width: 100%;
		font-size: 14px;
		color: #333;
		line-height: 24px;
	}
</style>
