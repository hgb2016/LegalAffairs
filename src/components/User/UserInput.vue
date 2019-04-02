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
			<button :class="{'next':next}" :disabled="nextFlag">
				保存
			</button>
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
    }
  },
	created () {
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
			background-color: #FE5A5A;
			line-height: 40px;
			text-align: center;
		}
		.next {
			background-color: #ccc;
		}
	}
}
</style>
