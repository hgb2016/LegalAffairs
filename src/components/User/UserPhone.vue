<template>
  <div class="user-phone">
		<error-remind  v-if="showRemind" @Close_errorMind="showRemind = false" :errorRemind="errorRemind"></error-remind>
		<div class="user-phone-input">
			<label>手机号：</label>
			<input type="number" placeholder="请输入您的手机号" name="phone" v-model="phone">
		</div>
		<div class="user-phone-input" style="margin-top:10px;">
			<label>验证码：</label>
			<input type="phone" placeholder="手机验证码" name="cmsCode" v-model="cmsCode" maxlength="6">
			<button class="getPhoneCoding" @click="getCoding" :disabled="orClick" :class="{'cccbgm':orClick}">{{buttonInfo}}</button>
		</div>
		<div class="user-phone-btn">
			<button @click="$_onUser" :class="{'next':next}" :disabled="nextFlag">保存</button>
		</div>
  </div>
</template>
<script>
import ErrorRemind from "base/ErrorRemind.vue";
export default {
	components:{
		ErrorRemind
	},
  data() {
    return {
      nextFlag: false,
      buttonInfo: "发送验证码",
      phone: "",
      cmsCode: "",
			orClick: false,
			showRemind:false,
			errorRemind:''
    };
  },
  computed: {
    next() {
      let flag = true;
      if (this.phone === "") {
        flag = false;
      }
      if (this.cmsCode === "") {
        flag = false;
      }
      if (flag) {
        this.nextFlag = false;
      } else {
        this.nextFlag = true;
      }
      return this.nextFlag;
    }
  },
  methods: {
		getCoding() {
    },
    async $_onUser() {
      
    },
  },
  created() {
  }
};
</script>
<style lang="less" scoped>
@import '../../assets/css/flex.less';
.user-phone {
  width: 100vw;
	min-height: 100vh;
	overflow: hidden;
	background: #efeff4;
  &-input {
    .f-d-f;
    background: #fff;
		height: 50px;
		margin-top:48px;
    .f-d-f;
		.f-ai-c;
    padding: 0 20px;
    position: relative;
    label {
      font-size: 14px;
      color: #333;
      width:80px;
    }
    input {
      .f-f-1;
      font-size: 14px;
      padding-top: 0;
    }
    button.getPhoneCoding {
      position: absolute;
      width: 100px;
      height: 40px;
      top: 5px;
      right: 20px;
			font-size: 14px;
			line-height: 40px;
			text-align: center;
			background-color: #2d75ee;
			color:#fff;
    }
    button.cccbgm {
      background-color: #ccc;
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
			background-color: #2d75ee;
		}
		.next {
			background-color: #ccc;
		}
	}
}
</style>
