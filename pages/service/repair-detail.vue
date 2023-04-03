<template>
	<view class="yh-bg">
		<form @submit="formSubmit">
			<view class="p15">
				<view class="field-box pl10 pr10">
					<view class="field-item flex">
						<text class="field-light">报修标题</text>
						<view class="flex1 tr ml15">
							<text class="title-model tl field-title">
								{{info.title}}
							</text>
						</view>
					</view>
					<view class="field-item flex flexmid">
						<text class="field-light">报修时间</text>
						<view class="flex1 field-title tr">{{dateFilter(info.reportDate,'dateminutes') || '-'}}</view>
					</view>
					<view class="field-item flex flexmid">
						<text class="field-light">报修类型</text>
						<view class="flex1 field-title tr">{{info.type.title}}</view>
					</view>
					<view class="field-item">
						<text class="field-light">报修描述</text>
						<view class="flex1 field-title mt5">{{info.descripe}}</view>
					</view>
					<view class="field-item">
						<attachmentCheck :atts="atts" :previewImgList="previewImgList" title="报修附件"></attachmentCheck>
					</view>
					<view class="field-item flex flexmid">
						<text class="field-light">报修状态</text>
						<view class="flex1 field-title tr" 
						:class="info.status.value != 'closed'? 'warning' : 'success'">{{info.status.title}}</view>
					</view>
					<template v-if="info.repairMan">
						<view class="field-item flex flexmid">
							<text class="field-light">维修员</text>
							<view class="flex1 field-title tr">{{info.repairMan}}</view>
						</view>
						<view class="field-item flex flexmid">
							<text class="field-light">联系电话</text>
							<view class="flex1 field-title tr">{{info.repairManMobile}}</view>
						</view>
						<view class="field-item  flex flexmid">
							<text class="field-light">指派时间</text>
							<view class="flex1 field-title tr">{{dateFilter(info.dispatchDate,'dateminutes') || '-'}}</view>
						</view>
					</template>
					<template v-if="info.closeType">
						<view class="field-item  flex flexmid">
							<text class="field-light">完成时间</text>
							<view class="flex1 field-title tr">{{dateFilter(info.closeDate,'dateminutes') || '-'}}</view>
						</view>
						<view class="field-item  flex flexmid">
							<text class="field-light">完成终端</text>
							<view class="flex1 field-title tr">{{info.closeType.title || '-'}}</view>
						</view>
						<view class="field-item  flex flexmid">
							<text class="field-light">订单评分</text>
							<view class="flex1 field-title tr">{{info.closeScore || '-'}}</view>
						</view>
					</template>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				info:{
					status:{value:""},
					type:{title:""},
					closeType:{title:""},
				},
				repair:{},//维修人员
				atts:[],//附件
				previewImgList:[]
			}
		},
		onLoad(option){
			this.id = option.id
		},
		mounted: function() {
			this.init();
		},
		methods: {
			init() {
				this.$http.get('/app/tenement/repair/' + this.id).then(res => {
					//console.log('rs',res)
					this.info = res.repair;
					var list = [];
					list = res.attachs;//附件
					if(list.length > 0){
						for (var i = 0; i < list.length; i++) {
							if(this.matchType(list[i].filename) == 'image'){
								this.previewImgList.push(this.fileUrl(list[i].url))
							}
							this.atts.push({
								url:this.fileUrl(list[i].url),
								fileName:list[i].filename,
								fileType:this.matchType(list[i].filename)
							})
						}
					}
					
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			}	
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id;
		}
	}
</script>

<style lang="scss">
	.field-light{
		font-size: 14px;
		line-height: 24px;
		color:#666;
	}
</style>
