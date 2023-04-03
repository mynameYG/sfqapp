<template>
	<view class="person-box">
		<text class="name" v-for="(item, index) in persons" :key="index" v-if="index < 3">{{item.name}}</text>
		<template v-if="persons.length>3">...</template>
	</view>
</template>

<script>
	import contactsStore from "@/store/contacts"
	export default {
		props: {
			persons: {
				type: Array,
				default: function() {
					return [];
				}
			},
			pname:"",
			type: String,
			select: String,
			multi: {
				type: Boolean,
				default: true
			}
		},
		created() {
			this.$store.registerModule(`${this.type}`, contactsStore);
			
			uni.$on(`person-choosed-${this.type}`, data => {
				this.$emit("update:persons", data);
			})
		},
		destroyed() {
			this.$store.unregisterModule(`${this.type}`);
		},
		methods: {
			choose() {
				uni.navigateTo({
					url: `/pages/contacts/street-list?type=${this.type}&multi=${this.multi}&pname=${this.pname}`,
					success: () => {
						this.$store.commit(`${this.type}/init`, this.persons);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.person-box{
		display: inline-block;
		max-width: 95%;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
	}
	.name{
		display: inline-block;
		/* margin:0 2px 2px 0; */
		font-size: 14px;
		color:#666;
		line-height: 24px;
		padding: 0px 6px;
	}
</style>