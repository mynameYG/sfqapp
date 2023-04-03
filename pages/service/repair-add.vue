<template>
	<view class="form-body">
		<form @submit="formSubmit">
			<view class="model-wrap p15">
				<view class="model-box no-mb clearfix">
					<view class="model-item flex flexmid">
						<text class="model-label require">报修标题</text>
						<input class="model-editText no-ml flex1 tr" type="text" 
						name='title' v-model="info.title"
						placeholder="请输入报修标题"
						/>
					</view>
					<view class="model-item flex flexmid">
						<text class="model-label require">报修类型</text>
						<dyPicker :range="problemType" rangeKey="title"  placeholder-class="gray-place" @getData="problemTypeChange" class="model-editText tr flex1 text-ellipsis"></dyPicker>
						<text class="model-decorate"><text class="iconfont icon-you"></text></text>
					</view>
					<view class="model-item">
						<view class="model-label require">问题描述</view>
						<view class="model-editText no-ml heigthAuto">
							<textarea maxlength="-1" name="descripe" v-model="info.descripe" placeholder="请输入问题描述" placeholder-class="gray-place" class="flex1 model-textarea"></textarea>
						</view>
					</view>
					<view class="model-item whiteBg no-bb">
						<view class="flex flexmid">
							<text class="model-label">照片</text>
							<view class="flex1 tr" @click="chooseImage()">
								<view class="file-border">
									<text class="iconfont icon-tianjia1"></text>
								</view>
							</view>
						</view>
						<!-- <tki-file-manager ref="fileListDome" @result="resultPath($event,fileList,'')"></tki-file-manager> -->
						<!-- <attachmentUpload :file="fileList" @getFile="getFile"></attachmentUpload> -->
					</view>
					<view class="model-item atts-item" v-for="(image,index) in fileList" :key="image.id">
						<view class="flex flexbet">
							<view class="atts-image">
								<image class="is-image" :src="fileRUrl(image.filePath)" :data-src="fileRUrl(image.filePath)" @tap="previewImage"></image>
							</view>
							<text class="atts-shanchu" @click="del(index)">
								<text class="iconfont icon-shanchu"></text>
							</text>
						</view>
					</view>
					
					<view class="submit-wrap fixed-btn">
						<button :disabled="submitting" formType="submit" class="tj">提交</button>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	var graceChecker = require("@/common/graceChecker.js");
	
	function GetDistance( lat1,  lng1,  lat2,  lng2){
	    var radLat1 = lat1*Math.PI / 180.0;
	    var radLat2 = lat2*Math.PI / 180.0;
	    var a = radLat1 - radLat2;
	    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
	    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
	    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
	    s = s *6378.137 ;// EARTH_RADIUS;
	    s = Math.round(s * 10000) / 10000;
	    return s;
	}
	
	export default {
		data() {
			return {
				id:"",
				typeIndex: 0,
				problemTypeCode:"",
				problemType:[
					{code:"",title:"请选择"},
					],//类型
				info:{
					address:""
				},
				fileList: [],//合同附件
				submitting:false,
				longitude:this.$config.longitude,
				latitude:this.$config.latitude,
			}
		},
		onLoad(option) {
			// console.log('option',option)
			this.id = option.id;
			this.roadStationId = option.roadId;
			// console.log('this.roadStationId’',this.roadStationId)
			//this.getLocation();
		},
		mounted(){
			this.init();
		},
		methods: {
			init(){
				this.getTypes();
			},
			getTypes(){
				this.$http.get(`/app/tenement/repair/types`).then(res => {
					this.problemType = res;
				})
			},
			problemTypeChange(e){
				this.problemTypeCode = e.code;
			},
			getCenterLocation(){
				let _self = this;
				this.map.getCenterLocation({
					success: ret => {
						this.covers = [];
						// 添加我的位置
						this.covers.push({
							longitude: ret.longitude,
							latitude: ret.latitude,
							iconPath: '../../static/img/location.png',
						});
						var point = new plus.maps.Point(ret.longitude, ret.latitude);
						plus.maps.Map.reverseGeocode(
							point,
							{},
							function(event) {
							   _self.info.address = event.address;
							})
					}
				})
			},
			numFilter(value) {
				// 截取当前数据到小数点后三位
				let tempVal = parseFloat(value).toFixed(7)
				let realVal = tempVal.substring(0, tempVal.length - 1)
				return realVal
			},
			chooseImage() {
				let _self = this;
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed', 'original'],
					count: 9,
					success: (res) => {
						// console.log('res',res)
						let arr = [];
						arr = res.tempFilePaths;
						arr.forEach((r) =>{
							this.$http.uploadFile({
								filePath: r
							}).then(data => {
								if(this.matchType(data.orginName) !== 'image'){
									uni.showToast({
										title: '请上传图片文件',
										icon: 'none'
									})
									return false;
								}
								_self.fileList.push({
									fileName: data.orginName,
									filePath: data.path,
									url: data.downloadUrl,
									orginName: data.orginName
								});
							})
						})
						
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: '需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			del(index){
				if(index == 0){
					this.fileList = []
				}else{
					this.fileList = this.fileList.splice(index, 1);
				}
			},
			previewImage(){
				let imgList =[];
				this.fileList.forEach(item =>{
					imgList.push(this.fileRUrl(item.filePath));
				})
				uni.previewImage({
					urls: imgList,
					current: imgList[0]
				});
			},
			/* 提交 */
			formSubmit: function(e) {
				let _self = this;
				/* let postLong = this.numFilter(ret.longitude);
				let postLat =  this.numFilter(ret.latitude);
				
				e.detail.value.longitude = postLong;
				e.detail.value.latitude = postLat; */
				e.detail.value.type = this.info.title;
				e.detail.value.type = this.problemTypeCode;//类型Code
				e.detail.value.descripe = this.info.descripe;
				//定义表单规则
				var rule = [
					{
						name: "title",
						checkType: "string",
						checkRule: "1,",
						errorMsg: "请输入报修标题"
					},
					{
						name: "type",
						checkType: "string",
						checkRule: "1,",
						errorMsg: "请选择报修类型"
					},
					{
						name: "descripe",
						checkType: "string",
						checkRule: "1,",
						errorMsg: "请输入问题描述"
					}
				]; 
				// if(e.detail.value.timeLimit){
				// 	const times = e.detail.value.timeLimit
				// 	let numReg = /^\d{1,}$/;
				// 	// console.log(numReg.test(times))
				// 	if(!numReg.test(times)){
				// 		uni.showToast({title: "问题处理时限应为整数",icon: 'none'});
				// 		return false
				// 	}
				// }
				
				
				let postFile = [];
				for (var i = 0; i < this.fileList.length; i++) {
					postFile.push({
						filename: this.fileList[i].fileName,
						path: this.fileList[i].filePath
					})
				};
							
				e.detail.value.attachs = postFile;
				let params = e.detail.value;
				var checkRes = graceChecker.check(e.detail.value, rule);
				if (checkRes) {
					// console.log('this.fileList',this.fileList);
					console.log('formData',params);
					//return false
					this.submitting = true;
					this.$http.post('/app/tenement/repair/report', params).then(formData => {
						uni.showToast({title: "报修成功",icon: 'none'});
						let pages = getCurrentPages();
						if (pages.length > 1) {
							this.pageBack('loadNewsList', 'refresh');
						}else{
							this.pageBack();
						}
						this.submitting = false;
					}).catch(()=> {
						this.submitting = false;
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/form.scss';//公共样式
	/deep/ .uni-input, .uni-input-placeholder,.placeholder{
		color:#333
	}
	.form-body{
		padding-bottom: 70px;
	}
	.model-title{
		padding-left: 15px;
		margin:0 -15px;
		height: 54px;
		line-height: 54px;
		background-color: #FBFBFB;
		font-size:14px;
	}
	.radio{
		font-size:14px;
		/deep/ uni-checkbox .uni-checkbox-input{
			border-radius: 50%;
			outline: none;
		}
		/deep/ uni-checkbox:not([disabled]) .uni-checkbox-input:hover{
			color:#1ea687;
			border-color: #1ea687;
		}
	}
	.btn-delete{
		color: #1ea687;
		float: right;
	}
	.btn-add{
		text-align: center;
		font-size: 14px;
		color: #1ea687;
		display: block;
		padding: 10px 0;
		border-radius: 3px;
		margin-bottom: 15px;
		.icon-tianjia{
			margin-right: 10px;
		}
	}
	
	
	.map-wrap{
		margin:10px 0;
		overflow: hidden;
		height: 230px;
	}
	/deep/ uni-map{
		width: 100%;
		height: 100%
	}
	
	.cover-view {
		position: absolute;
		width:100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: .01;
	}
	.model-item .smallInput{
		width: 56px;
		display: inline-block;
		vertical-align: -6px;
		text-align: center;
		border-bottom: 1px solid #333;
		height: 23px;
	}
	
	.atts-item {
		padding:0;
		height: 60px;
		border: 1px solid #F2F2F2!important;
		background: #FBFCFE;
		margin-bottom: 10px;
		position: relative;
		.atts-image {
			width: 60px;
			height: 60px;
			padding: 10px;
		}
	
		.no-image {
			position: absolute;
			top: 10px;
			left: 10px;
			max-width: 40px;
			max-height: 40px;
			border: none;
			box-shadow: none;
		}
	
		.is-image {
			width: 40px;
			height: 40px;
			border: none;
			box-shadow: none;
		}
	}
	.atts-shanchu {
		display: inline-block;
		width: 50px;
		height: 30px;
		margin-top: 15px;
		text-align: center;
		
		.icon-shanchu {
			font-size: 16px;
			color: #ccc;
		}
	}
	
	.choose-btn{
		border-radius: 5px;
		overflow: hidden;
		font-size:14px;
		uni-text{
			display: inline-block;
			min-width:44px;
			text-align: center;
			background-color: #ccc;
			color:#fff;
			&:first-child{
				border-right: 1px solid #fff;
			}
		}
		.current{
			background-color: #277af5;
		}
	}
</style>
