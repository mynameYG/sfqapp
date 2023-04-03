<template>
	<picker @change="bindPickerChange" :value="index" :disabled="disabled" :range="range" :range-key="rangeKey">
		<view class="uni-input" v-if="pickerValue">{{pickerValue[rangeKey]}}
		</view>
		<view v-else class="placeholder">{{placeholder}} </view>
	</picker>
</template>
<script>
	export default {
		name: 'dyPickerGoods',
		props: {
			disabled: {
				type: Boolean,
				default: () => false
			},
			placeholder: {
				type: String,
				default () {
					return '请选择'
				}
			},
			value: {
				default () {
					return ''
				}
			},
			range: {
				default () {
					return []
				}
			},
			rangeKey: {
				default () {
					return ''
				}
			},
			detailsIndex: {
				default () {
					return ''
				}
			}
		},
		data() {
			return {
				index: 0,
				pickerValue: ""
			}
		},
		mounted() {},
		methods: {
			bindPickerChange(e) {
				this.index = e.target.value;
				this.pickerValue = this.range[this.index];
				
				const dataObj = {
					pickerValue:this.pickerValue,
					detailsIndex:this.detailsIndex
				};

				this.$emit('getData', dataObj)
			}
		}
	}
</script>
<style>
	.placeholder {
		color: #999;
		font-size: 14px;
	}
</style>
