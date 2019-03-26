<template>
  <div class="user-pwd">
		<error-remind  v-if="showRemind" @Close_errorMind="showRemind = false" :errorRemind="errorRemind"></error-remind>
		<div class="user-pwd-phone">
			<div>
				<label for="">输入原密码：</label>
				<input type="password" placeholder="请输入原密码" v-model="beforepwd">
			</div>
			<div>
				<label for="">输入新密码：</label>
				<input type="password" placeholder="请输入新密码" v-model="newPwd">
			</div>
			<div>
				<label for="">确认新密码：</label>
				<input type="password" placeholder="请确认新密码" v-model="surePwd">
			</div>
		</div>
    <div class="user-pwd-btn">
        <button @click="$_modifyPwd" :class="{'next':next}" :disabled="nextFlag">完成</button>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
import ErrorRemind from "base/ErrorRemind.vue";
export default {
	components: {
		ErrorRemind
	},
  data () {
      return {
        beforepwd: '',
        newPwd: '',
        surePwd: '',
        nextFlag: false,
				showSysErr: false,
				showRemind: false,
				errorRemind: ''
      }
	},
	computed: {
		next () {
      let flag = true;
      if(this.beforepwd === ''){
        flag = false
      }
      if(this.newPwd === ''){
        flag = false
			}
			if(this.newPwd === ''){
        flag = false
      }
      if(flag){
        this.nextFlag = false
      }else{
        this.nextFlag = true 
      }
      return this.nextFlag
    }
	},
	methods: {
		async $_modifyPwd () {
			if (this.beforepwd === this.newPwd) {
				this.showRemind = true
				this.errorRemind = '新密码与原密码不能重复...'
			} else {
				if (this.newPwd.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)) {
					
				} else {
					this.showRemind = true
					this.errorRemind = '请输入正确的密码...'
				}
			}
		},
	},
}
</script>
<style lang="less" scoped>
@import '../../assets/css/flex.less';
.user-pwd{
	width:100vw;
	min-height:100vh;
	overflow: hidden;
	background: #efeff4;
	&-phone{
		div{
			height:50px;
			background-color:#fff;
			margin-top:10px;
			.f-d-f;
			.f-ai-c;
			padding:0 20px;
			label{
				width:120px;
				color:#333;
				font-size:14px;
			}
			input{
				.f-f-1;
				font-size: 14px;
			}
		}
	}
	&-btn {
		background: #efeff4;
		padding:0 20px;
		margin-top:20px;
		button {
			width:100%;
			height:40px;
			color:#fff;
			font-size:14px;
			line-height: 40px;
			text-align: center;
			background-color: #FE5A5A;
		}
		.next {
			background-color: #ccc;
		}
	}
}

</style>
