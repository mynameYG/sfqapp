<template>
	<view class="bg">
		<view class="model-wrap p15">
			<view style="width: 100%;">
				<image class="img" style="width: 100%;max-height:300px" :src="fileRUrl(info.activity.titleImg)" mode="widthFix"></image>
			</view>
			<view class="model-box no-mb">
				<view class="model-item flex">
					<text class="model-label">标题</text>
					<view class="model-editText tr flex1 heigthAuto">
						<text class="title-model tl">
							[{{info.activity.type.title}}]{{info.activity.title}}
						</text>
					</view>
				</view>
				<view class="model-item flex flexmid">
					<text class="model-label">投票开始时间</text>
					<view class="model-editText tr flex1">
						{{dateFilter(info.activity.startDate,'date')}}
					</view>
				</view>
				<view class="model-item flex flexmid">
					<text class="model-label">投票截止时间</text>
					<view class="model-editText tr flex1">
						{{dateFilter(info.activity.endDate,'date')}}
					</view>
				</view>
				<view class="model-item">
					<view class="model-label mb5">投票说明</view>
					<view class="model-textarea tl">
						{{info.activity.descripe}}
					</view>
				</view>
				<!-- <template v-if="info.activityRecord != null && info.activityRecord.examineResult == '0'">
					<view class="model-item flex flexmid">
						<text class="model-label">审核结果</text>
						<view class="model-editText tr flex1 danger">
							审核未通过
						</view>
					</view>
					<view class="model-item">
						<text class="model-label mb5">审核原因</text>
						<view class="model-textarea tl">
							{{info.activityRecord.examineReason || '原因不明确，请联系辅导员咨询'}}
						</view>
					</view>
				</template> -->
			</view>
		</view>
		
		<text v-if="enter == 'false'" class="fixed-btn-rightBottom" @tap="signUp">报名</text>
		<!-- 报名 -->
		<popup ref="popup" :info="info" @refresh="refresh"></popup>
	</view>
</template>

<script>
	import popup from './components/popup-singUp.vue'
	export default {
		components: {
			popup
		},
		data(){
			return{
				id:"",
				info:{
					activity:{},
					activityRecord:{}
				},
				enter:""
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.enter = option.enter
		},
		mounted(){
			this.init()
		},
		methods:{
			init(){
				this.$http.get(`/app/tenement/vote/${this.id}`).then(res => {
					console.log('res',res)
					this.info.activity =  res.vote;
					let dateA = (new Date()).getTime();
					let endTime = this.dateFilter(res.activity.endDate,'date') + ' 23:00:00';
					let endDate = new Date(endTime.replace(/-/g,"/")).getTime();
					if(dateA - endDate > 0){
						this.enter = true
					}
				}).catch(err => {
					err && uni.showToast({title: err,icon: 'none'})
				});
			},
			//报名
			signUp(item){
				this.$refs.popup.init();
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/form.scss';//公共样式
	.model-item .model-label{
		color:#666;
	}
	.model-editText{
		.img{
			width:90px;
			height: 64px;
		}
	}
</style>
