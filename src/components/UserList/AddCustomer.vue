<template>
  <div class="add-customer">
		<div class="add-customer-input">
			<input type="text"  placeholder="请输入客户名称">
		</div>
		<div class="add-customer-info">
			<div class="info" @click="twoScale">
				<span>客户信息</span>
				<img src="../../assets/img/down.png" alt="">
			</div>
			<transition name="fade">
				<div class="info hideFive" v-if="scaleInfo">
					<div>
						<p>网址</p>
						<input type="text" placeholder="请输入网址">
					</div>
					<div>
						<p>电话</p>
						<input type="number" placeholder="请输入电话">
					</div>
					<div>
						<p>传真</p>
						<input type="text" placeholder="请输入传真">
					</div>
					<div>
						<p>地址</p>
						<input type="text" placeholder="请输入地址">
					</div>
					<div>
						<p>描述</p>
						<input type="text" placeholder="请输入描述">
					</div>
				</div>
			</transition>
			<div class="info">
				<span>联系人信息</span>
				<img src="../../assets/img/contact_add.png" alt="">
			</div>
			<div class="info">
				<span>谁可见</span>
				<img src="../../assets/img/contact_add.png" alt="">
			</div>
		</div>
		<transition name="fade">
			<add-contact v-if="showContact" @SaveAdd="SaveAdd"></add-contact>
		</transition>
	</div>
</template>

<script>
import AddContact from 'base/AddContact'
export default {
	components:{
		AddContact
	},
	data () {
		return {
			scaleInfo: false,
			showContact:false
		}
	},
	methods:{
		twoScale () {
			if (this.scaleInfo === false) {
				this.scaleInfo = true
			} else {
				this.scaleInfo = false
			}
		},
		SaveAdd () {
			this.showContact = false
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.add-customer {
	&-input {
		height:60px;
		.f-d-f;
		input{
			.f-f-1;
			text-align: center;
			background-color: #ccc;
			font-size:18px;
			color:#000;
		}
		::-webkit-input-placeholder{
			color:#000;
		}
	}
	&-info {
		.f-d-f;
		.f-fd-c;
		.info {
			.f-d-f;
			.f-jc-sb;
			.f-ai-c;
			padding:0 20px;
			height:50px;
			border-bottom:1px solid #e5e5e5;
			span {
				font-size:14px;
				color:#333;
			}
			img {
				width:22px;
			}
		}
		.hideFive {
			.f-d-f;
			.f-fd-c;
			height:auto;
			div {
				height:50px;
				width:100%;
				.f-d-f;
				.f-jc-sb;
				.f-ai-c;
				padding:0 0px 0 8px;
				p {
					color:#666;
				}
				input {
					text-align: right;
					font-size:14px;
					color:#333;
				}
			}
		}
	}
}
</style>
