<template>
	<view>
		<view @click="(!readonly) && $refs.wpicker.show()">
			<view class="uni-input" v-if="value">{{value}}</view>
			<view v-else class="placeholder">{{placeholder}} </view>
		</view>
		<w-picker
			mode="date" 
			:startYear="startYear" 
			:endYear="endYear"
			:current="false"
			:fields="fields"
			:value="value"
			@confirm="onConfirm($event)"
			@cancel="onCancel"
			:disabled-after="false"
			ref="wpicker"
		></w-picker>
	</view>
</template>

<script>
	export default {
		props: {
			value: String,
			placeholder: {
				type: String,
				default: '请选择'
			},
			readonly: {
				type: Boolean,
				default: false
			},
			startYear: {
				type: [String,Number],
				default: '1900'
			},
			endYear: {
				type: [String,Number],
				default () {
					return new Date().getFullYear() + 100;
				}
			},
			fields:{ //日期颗粒度
				type:String,
				default:"minute",
				validator: function(value) {
					return ['year', 'month', 'day', 'hour', 'minute', 'second'].indexOf(value) !== -1
				}
			},
		},
		methods: {
			onConfirm(res) {
				this.$emit("input", res.result);
				this.$emit("ok");
			},
			onCancel(){
				
			}
		}
	}
</script>

<style>
</style>
