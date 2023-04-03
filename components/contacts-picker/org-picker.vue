<template>
	<view class="person-box">
		<template v-if="orgs.length > 0">
			<text class="name" v-for="(item, index) in orgs" :key="item.id" v-if="index < 1">{{item.name}}</text>
			<template v-if="orgs.length>1">...</template>
		</template>
	</view>
</template>

<script>
	import contactsStore from "@/store/contacts"
	export default {
		props: {
			orgs: {
				type: Array,
				default: function() {
					return [];
				}
			},
			type: String,
			multi: {
				type: Boolean,
				default: true
			}
		},
		created() {
			this.$store.registerModule(`${this.type}`, contactsStore);
			
			uni.$on(`person-choosed-${this.type}`, data => {
				this.$emit("update:orgs", data);
			})
		},
		destroyed() {
			this.$store.unregisterModule(`${this.type}`);
		},
		methods: {
			choose() {
				uni.navigateTo({
					url: `/pages/contacts/org-contacts?type=${this.type}&multi=${this.multi}`,
					success: () => {
						this.$store.commit(`${this.type}/init`, this.orgs);
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