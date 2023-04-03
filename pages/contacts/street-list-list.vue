<template>
	<view class="contact">
		<view class="pl15 pr15 pt10 pb10">
			<uni-search-bar placeholder="搜索" bgColor="#EFEFEF" @input="input"></uni-search-bar>
		</view>
		<view v-if="!searchShow">
			<view class="contacts-biglist contacts-checkbox">
				<template v-if="multi">
					<view class="contacts-bigitem flex flexmid" v-for="item in list.orgs" :key="item.id" v-show="list.orgs.length > 0">
						<checkbox-group class="ml15" @change="orgCheckboxChange(item)">
							<label class="org-checkbox">
								<checkbox :value="item.id" :checked="orgChecked(item)" :disabled="!item.hasChildOrg && item.userCount ==0 " />
							</label>
						</checkbox-group>
						<view class="flex1" @click="ToList(item)">
							<view class="contacts-biglink flex flexmid">
								<template v-if="item.hasChecked">
									<view class="contacts-bigmid flex1 text-ellipsis">{{item.name}}<text :class="item.checkedCount > 0 ? 'contacts-blue' : ''">（{{item.checkedCount}}/{{item.userCount}}）</text></view>
								</template>
								<template v-else>
									<view class="contacts-bigmid flex1 text-ellipsis">--{{item.name}}（{{item.userCount}}）--</view>
								</template>
								<text class="contacts-bigright iconfont icon-you"></text>
							</view>
						</view>
					</view>
				</template>
				
				<template v-else>
					<view class="contacts-bigitem" v-for="(item,n) in list.orgs" :key="n" v-show="list.orgs.length > 0">
						<view class="contacts-biglink flex flexmid" @click="ToList(item)">
							<view class="contacts-bigmid flex1 text-ellipsis">{{item.name}}</view>
							<text class="contacts-bigright iconfont icon-you"></text>
						</view>
					</view>
				</template>
			</view>
			<view class="contacts-smalllist contacts-checkbox" v-if="list.users.length > 0">
				<view class="check-all" v-if="multi">
					<label class="org-checkbox" @click="allcheckAction()"><checkbox :checked="allcheck"/><text>全选</text></label>
				</view>
				<checkbox-group @change="checkboxChange" v-if="multi">
					<view class="contacts-smalllink" v-for="(item,i) in list.users" :key="i" >
						<label class="org-checkbox flex flexmid">
							<checkbox :value="item.id" :checked="users.has(item.id)" />
							<image class="contacts-smallleft" src="../../static/img/default-photo.png" mode=""></image>
							<view class="contacts-smallmid flex1 text-ellipsis">
								<view class="contacts-smallname text-ellipsis">{{item.name}}</view>
								<view class="contacts-smallname text-ellipsis">
									<text>{{item.orgName || ""}}</text>
									<text class="contacts-job" style="margin-left: 20px;">{{item.postName || ""}}</text>
								</view>
							</view>
						</label>
					</view>
				</checkbox-group>
				<radio-group @change="checkboxChange" v-else>
					<view class="contacts-smalllink" v-for="(item,i) in list.users" :key="i" >
						<label class="org-checkbox flex flexmid">
							<radio :value="item.id" :checked="users.has(item.id)" />
							<image class="contacts-smallleft" src="../../static/img/default-photo.png" mode=""></image>
							<view class="contacts-smallmid flex1 text-ellipsis">
								<!-- <text class="contacts-smallname text-ellipsis">{{item.name}}</text>
								<text class="contacts-smallxi text-ellipsis">{{item.email}}</text> -->
								
								<view class="contacts-smallname text-ellipsis">{{item.name}}</view>
								<view class="contacts-smallname text-ellipsis">
									<text>{{item.orgName || ""}}</text>
									<text class="contacts-job" style="margin-left: 20px;">{{item.postName || ""}}</text>
								</view>
								<!-- <view class="contacts-smallxi text-ellipsis">15036616369</view> -->
							</view>
						</label>
					</view>
				</radio-group>
			</view>
		</view>
		<view class="contacts-sousuo"  v-if="searchShow">
			<view class="contacts-smalllist contacts-checkbox" v-if="list.users.length > 0">
				<view class="check-all" v-if="multi">
					<label class="org-checkbox" @click="allcheckAction()"><checkbox :checked="allcheck"/><text>全选</text></label>
				</view>
				<checkbox-group @change="checkboxChange" v-if="multi">
					<view class="contacts-smalllink" v-for="(item,i) in list.users" :key="i" >
						<label class="org-checkbox flex flexmid">
							<checkbox :value="item.id" :checked="users.has(item.id)" />
							<image class="contacts-smallleft" src="../../static/img/default-photo.png" mode=""></image>
							<view class="contacts-smallmid flex1 text-ellipsis">
								<view class="contacts-smallname text-ellipsis">{{item.name}}</view>
								<view class="contacts-smallname text-ellipsis">
									<text>{{item.orgName || ""}}</text>
									<text class="contacts-job" style="margin-left: 20px;">{{item.postName || ""}}</text>
								</view>
							</view>
						</label>
					</view>
				</checkbox-group>
				<radio-group @change="checkboxChange" v-else>
					<view class="contacts-smalllink" v-for="(item,i) in list.users" :key="i" >
						<label class="org-checkbox flex flexmid">
							<radio :value="item.id" :checked="users.has(item.id)" />
							<image class="contacts-smallleft" src="../../static/img/default-photo.png" mode=""></image>
							<view class="contacts-smallmid flex1 text-ellipsis">
								<view class="contacts-smallname text-ellipsis">{{item.name}}</view>
								<view class="contacts-smallname text-ellipsis">
									<text>{{item.orgName || ""}}</text>
									<text class="contacts-job" style="margin-left: 20px;">{{item.postName || ""}}</text>
								</view>
							</view>
						</label>
					</view>
				</radio-group>
			</view>
			<view class="fs13 tc p15 mt15" v-else>暂无搜索结果</view>
		</view>
		<view class="share-wrap">
			<view class="share-box flex flexmid">
				<view class="flex1 share-num" @click="open()">已选择：{{count}}人
				<text v-show="count > 0" class="iconfont icon-xiangshang" style="color:#3D9CFC;margin: 10px;"></text>
				</view>
				<button class="share-btn" @click="ToAdd()">确定</button>
			</view>
		</view>
	</view>
</template>

<script>	
	export default {
		props: {
			t: String,
			m: Boolean
		},
		data() {
			return {
				list:{users:[],orgs:[]},
				pid: 0,
				type: this.t,
				multi: this.m,
				searchShow:false,
				keyword:"",
			}
		},
		onLoad(opt) {
			this.pid = opt.pid || 0;
			this.type = opt.type || '';
			this.multi = opt.multi !== 'false';
			uni.setNavigationBarTitle({
				title: opt.pname || '通讯录'
			})
		},
		onBackPress() {
			// this.$store.commit(`${this.type}/init`);
		},
		watch:{
			keyword(newVal, oldVal){
				if(newVal && newVal != ""){
					this.searchShow = true;
					this.delay(() => {
						this.search();
					}, 300);
				}else{
					this.searchShow = false;
					this.init();
				}
			}
		},
		computed:{
			users() {
				return this.$store.state[this.type].datas;
			},
			persons(){
				return this.$store.getters[`${this.type}/list`];
			},
			count() {
				return this.$store.getters[`${this.type}/count`];
			},
			allcheck() {
				let count = this.persons.length;
				for (let user of this.list.users) {
					if (!this.users.has(user.id)) {
						return false;
					}
				}
				return true;
			}
		},
		mounted(){
			this.init();
		},
		methods: {
			init(){
				this.$http.get(`/app/pub/community/${this.pid}`).then(res => {
					//this.list = res;
					this.list.orgs = res;
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})
				});
			},
			ToList(item){
				console.log('item',item)
				uni.navigateTo({
					url: `/pages/contacts/street-list-list-list?pid=${item.id}&pname=${item.name}&type=${this.type}&multi=${this.multi}`
				});
				/* if(item.hasChildOrg || item.userCount > 0){
					uni.navigateTo({
						url: `/pages/contacts/person-contacts-list?pid=${item.id}&pname=${item.name}&type=${this.type}&multi=${this.multi}`
					});
				}else{
					uni.showToast({title: "暂无下级部门和人员",icon: 'none'})
				} */
			},
			allcheckAction(){
				const allcheck = !this.allcheck;
				for (let item of this.list.users) {
					if(allcheck) {
						this.$store.commit(`${this.type}/put`, {data: item, multi: this.multi});
					} else {
						this.$store.commit(`${this.type}/remove`, item);
					}
				}
			},
			checkboxChange: function (e) {
				const values = e.detail.value;
				
				for (let item of this.list.users) {
					if(values.includes(item.id)){
						this.$store.commit(`${this.type}/put`, {data: item, multi: this.multi});
					}else{
						this.$store.commit(`${this.type}/remove`, item);
					}
				}
			},
			orgCheckboxChange: function(org) {
				for (let item of this.list.orgs) {
					if (org.id === item.id) {
						if(!org.checkall) {
							this.$store.commit(`${this.type}/putAll`, item.users);
						} else {
							for (let user of item.users) {
								this.$store.commit(`${this.type}/remove`, user);
							}
						}
						
						break;
					}
				}
			},
			orgChecked(org) {
				let count = 0;
				
				for (let user of org.users) {
					if (this.users.has(user.id)) {
						count ++;
					}
				}
				
				org.hasChecked = count > 0;
				org.checkall = (count === org.users.length && count > 0);
				org.checkedCount = count;
				
				return org.checkall;
			},
			open(){
				if (this.count > 0) {
					uni.navigateTo({
						url: `/pages/contacts/street-list-popup?type=${this.type}`
					});
				}
			},
			ToAdd(){
				this.$emit("ok");
				uni.$emit(`person-choosed-${this.type}`, this.persons);
				
				let pages = getCurrentPages();
				let index = 0;
				for (let page of pages) {
				  if (page.route === 'pages/contacts/street-list') {
					break;
				  }
				  index++;
				}
				
				uni.navigateBack({delta: pages.length - index});
				
			},
			search(){
				this.$http.get('/app/address/search',{keyword:this.keyword}).then(res => {
					this.list.users = res;
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})
				});
			},
			input(res){
				this.keyword = res.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/contacts.scss';

	.contact {
		min-height: calc(100vh - 94px);
		background-color: #FBFBFB;
		margin-bottom: 60px;
	}
	/* #ifdef APP-PLUS */
	.contact {
		min-height: 100vh;
	}

	/* #endif */
	.check-all{
		width: 100%;
		background-color: #fff;
		padding: 10px 15px;
		font-size: 15px;
		.org-checkbox{
			display: block;
			width: 100%;
		}
		text{
			margin-left: 15px;
		}
	}
	/* #ifdef APP-PLUS || H5 */
	/deep/ .contacts-checkbox .contacts-smalllink uni-checkbox .uni-checkbox-input, /deep/ .check-all .uni-checkbox-input{
		border-radius: 50% !important;
		margin-left:10px;
	} 
	/* #endif */
	.share-wrap{
		width: 100%;
		height: 50px;
		background-color: #fff;
		box-shadow: 0 -2px 3px #efefef;
		padding: 10px 15px;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
	}
	.share-box .share-num{
		font-size: 14px;
		color:#333;
		line-height: 30px;
	}
	/deep/ .share-box .share-btn{
		background-color: #3D9CFC;
		line-height: 30px;
		font-size: 14px;
		color:#fff;
		line-height: 30px;
	}
	.contacts-blue{
		color:#3D9CFC;
	}
</style>
