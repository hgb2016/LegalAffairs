<template>
  <div class="user-input">
		<error-remind  v-if="showRemind" @Close_errorMind="showRemind = false" :errorRemind="errorRemind"></error-remind>
		<div class="user-input-info">
			<span>
				{{title}}：
			</span>
			<input type="text" v-model="content" :placeholder="place">
		</div>
		<div class="user-input-btn">
			<button :class="{'next':next}" :disabled="nextFlag" @click="updateInfo">
				保存
			</button>
		</div>
	</div>
</template>

<script>
import ErrorRemind from "base/ErrorRemind.vue";
import postHttp from "../../assets/js/postHttp.js";
export default {
	components:{
		ErrorRemind
	},
	data() {
		return {
			content:'',
			title:'',
			place:'',
			nextFlag: false,
			showRemind:false,
			errorRemind:''
		}
	},
	computed: {
    next() {
      let flag = true;
      if (this.content === "") {
        flag = false;
      }
      if (flag) {
        this.nextFlag = false;
      } else {
        this.nextFlag = true;
      }
      return this.nextFlag;
		},
		userInfo () {
			return this.$store.getters.getUserInfo
		}
	},
	methods:{
		updateInfo () {
			if (this.title === '姓名') {
				this.updateName()
			} else if (this.title === '公司') {
				this.updateCompany()
			} else if (this.title === '地址') {
				this.updateAddress()
			} else if (this.title === '职务') {
				this.updatePost()
			} else if (this.title === '邮箱') {
				this.updateEmail()
			}	else if (this.title === '费率') {
				this.updateRate()
			}
		},
		async updateName () {
			let newObj = {};
			newObj["loginUserId"] = localStorage.getItem("loginUserId")
			newObj["logintoken"] = window.localStorage.getItem("logintoken")
			newObj["userName"] = this.content;
			newObj["email"] = this.userInfo.email;
			newObj["address"] = this.userInfo.address;
			newObj["company"] = this.userInfo.company;
			newObj["duty"] = this.userInfo.duty;
			newObj["hourRate"] = this.userInfo.hourRate;
			const { data } = await postHttp.post("/User/editUserInfo", newObj);
			if (!data.error) {
				this.showRemind = true
				this.errorRemind = '修改成功'
      
				setTimeout(()=>{
					this.$router.go(-1)
				},2000)
			}	
		},
		async updateCompany () {
			let newObj = {};
			newObj["loginUserId"] = localStorage.getItem("loginUserId")
			newObj["logintoken"] = window.localStorage.getItem("logintoken")
			newObj["userName"] = this.userInfo.userName;
			newObj["email"] = this.userInfo.email;
			newObj["address"] = this.userInfo.address;
			newObj["company"] = this.content;
			newObj["duty"] = this.userInfo.duty;
			newObj["hourRate"] = this.userInfo.hourRate;
			const { data } = await postHttp.post("/User/editUserInfo", newObj);
			if (!data.error) {
				this.showRemind = true
				this.errorRemind = '修改成功'
				setTimeout(()=>{
					this.$router.go(-1)
				},2000)
			}	
		},
		async updateAddress () {
			let newObj = {};
			newObj["loginUserId"] = localStorage.getItem("loginUserId")
			newObj["logintoken"] = window.localStorage.getItem("logintoken")
			newObj["userName"] = this.userInfo.userName;
			newObj["email"] = this.userInfo.email;
			newObj["address"] = this.content;
			newObj["company"] = this.userInfo.company;
			newObj["duty"] = this.userInfo.duty;
			newObj["hourRate"] = this.userInfo.hourRate;
			const { data } = await postHttp.post("/User/editUserInfo", newObj);
			if (!data.error) {
				this.showRemind = true
				this.errorRemind = '修改成功'
				setTimeout(()=>{
					this.$router.go(-1)
				},2000)
			}	
		},
		async updatePost () {
			let newObj = {};
			newObj["loginUserId"] = localStorage.getItem("loginUserId")
			newObj["logintoken"] = window.localStorage.getItem("logintoken")
			newObj["userName"] = this.userInfo.userName;
			newObj["email"] = this.userInfo.email;
			newObj["address"] = this.userInfo.address;
			newObj["company"] = this.userInfo.company;
			newObj["duty"] = this.content;
			newObj["hourRate"] = this.userInfo.hourRate;
			const { data } = await postHttp.post("/User/editUserInfo", newObj);
			if (!data.error) {
				this.showRemind = true
				this.errorRemind = '修改成功'
			
				setTimeout(()=>{
					this.$router.go(-1)
				},2000)
			}	
		},
		async updateEmail () {
			let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (!pattern.test(this.content)) {
				this.showRemind = true
				this.errorRemind = '邮箱格式不正确'
				setTimeout(()=>{
						this.showRemind = false
						this.errorRemind = ''
				},2000)
			} else {
				let newObj = {};
				newObj["loginUserId"] = localStorage.getItem("loginUserId")
				newObj["logintoken"] = window.localStorage.getItem("logintoken")
				newObj["userName"] = this.userInfo.userName;
				newObj["email"] = this.content;
				newObj["address"] = this.userInfo.address;
				newObj["company"] = this.userInfo.company;
				newObj["duty"] = this.userInfo.duty;
				newObj["hourRate"] = this.userInfo.hourRate;
				const { data } = await postHttp.post("/User/editUserInfo", newObj);
				if (!data.error) {
					this.showRemind = true
					this.errorRemind = '修改成功'
					  window.localStorage.setItem('email',this.userInfo.email)
					setTimeout(()=>{
						this.$router.go(-1)
					},2000)
				}	
			}
		},
		async updateRate () {
			let newObj = {};
			newObj["loginUserId"] = localStorage.getItem("loginUserId")
			newObj["logintoken"] = window.localStorage.getItem("logintoken")
			newObj["userName"] = this.userInfo.userName;
			newObj["email"] = this.userInfo.email;
			newObj["address"] = this.userInfo.address;
			newObj["company"] = this.userInfo.company;
			newObj["duty"] = this.userInfo.duty;
			newObj["hourRate"] = this.content;
			const { data } = await postHttp.post("/User/editUserInfo", newObj);
			if (!data.error) {
				this.showRemind = true
				this.errorRemind = '修改成功'
				setTimeout(()=>{
					this.$router.go(-1)
				},2000)
			}	
		},
	},
	created () {
		this.$store.dispatch('getUserInfo',{loginUserId: window.localStorage.getItem("loginUserId"),logintoken:window.localStorage.getItem("logintoken")})
		this.title = this.$route.query.title
		this.content = this.$route.query.content
		this.place = '请输入'+this.$route.query.title
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/css/flex.less';
.user-input {
	.f-d-f;
	.f-fd-c;
	min-height: 100vh;
	background-color: #efeff4;
	&-info {
		height:50px;
		.f-d-f;
		.f-ai-c;
		padding:0 10px;
		background-color: #fff;
		margin-top:48px;	
		span {
			width:70px;
			color: #333;
    	font-size: 14px;
		}
		input {
			font-size: 14px;
			.f-f-1;
		}
	}
	&-btn {
		padding:0 10px;
		margin-top:20px;
		button {
			width:100%;
			height:40px;
			color:#fff;
			font-size:14px;
			background-color: #2d75ee;
			line-height: 40px;
			text-align: center;
		}
		.next {
			background-color: #ccc;
		}
	}
}
</style>
