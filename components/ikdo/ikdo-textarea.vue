<template>
	<textarea class="textarea-con" :maxlength="maxlength" :auto-height="autoHeight"
		:placeholder="placeholder" :focus="focus" :value="valueInner"
		@input="textareaInput"></textarea>
</template>

<script>
	export default {
		props: {
			value: String,
			placeholder: String,
			maxlength: {
				type: Number,
				default: -1
			},
			autoHeight: {
				type: Boolean,
				default: false
			},
			focus: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				valueInner: ""
			}
		},
		mounted() {
		    this.setValue(this.value);
		},
		watch: {
			value(val) {
				if (!this.inited) {
					this.valueInner = val;
					this.inited = true;
				}
			}
		},
		methods: {
			textareaInput({detail}) {
				this.inited = true;
				this.$emit('input', detail.value);
			},
			setValue(value) {
				this.valueInner = value;
			}
		}
	}
</script>

<style>
	.textarea-con{
		width: 100%;
	}
</style>
