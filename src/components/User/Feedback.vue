<template>
  <div class="feed-back">
		<div class="feed-back-nav">
			<img src="../../assets/img/icon_pan.png" alt="">
			<span>写下您宝贵的意见</span>
		</div>
		<div class="feed-back-text">
			<textarea name="" id="" cols="30" rows="10" v-model="feedInfo"></textarea>
		</div>
		<div class="feed-back-phone">
			<label for="">手机号码</label>
			<div>
				<input type="text" v-model="phone">
			</div>
		</div>
		<div class="feed-back-btn">
			<span @click="submitFeed">提交意见</span>
		</div>
		<error-remind
      v-if="showRemind"
      @Close_errorMind="showRemind = false"
      :errorRemind="errorRemind"
    ></error-remind>
	</div>  
</template>

<script>
import ErrorRemind from "base/ErrorRemind.vue";
export default {
	components:{
		ErrorRemind
	},
	data () {
		return {
			phone:'',
			feedInfo:'',
			showRemind:false,
			errorRemind:''
		}
	},
	methods:{
		async submitFeed () {
			if (this.feedInfo==='') {
				this.showRemind = true,
				this.errorRemind = '请输入反馈意见'
			} else {

			}
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.feed-back {
	padding:58px 26px;
	&-nav {
		.f-d-f;
		.f-ai-c;
		img {
			width:20px;
		}
		span {
			font-size:12px;
			color:#666;
			margin-left:4px;
		}
	}
	&-text{
		border:1px solid #e5e5e5;
		border-radius: 4px;
		margin-top:10px;
		textarea {
			width:100%;
			padding:10px;
			-webkit-appearance: none;
		}
	}
	&-phone{
		.f-d-f;
		.f-ai-c;
		margin-top:10px;
		label {
			font-size:14px;
			color:#000;
		}
		div {
			.f-f-1;
			height:24px;
			border:1px solid #e5e5e5;
			border-radius: 4px;
			margin-left:8px;
			padding-left:6px;
			input {
				height:100%;
				font-size:14px;
				color:#000;
			}
		}
	}
	&-btn {
		margin-top:28px;
		.f-d-f;
		.f-ai-c;
		.f-jc-c;
		span {
			padding: 8px 12px;
			font-size:14px;
			color:#fff;
			background-color: #2d75ee;
			border-radius: 4px;
		}
	}
}
</style>
