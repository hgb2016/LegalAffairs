<template>
  <div class="cdetails">
		<div class="cdetails-title">
			<p>{{name.split('-')[0]}}</p>
			<span>描述</span> 
		</div>
		<div class="cdetails-list">
			<ul>
				<li>
					<img src="../../assets/img/link.png" alt="">
					<!-- 网址 -->
					<span>可可家</span> 
				</li>
				<li>
					<!-- 地址 -->
					<img src="../../assets/img/location1.png" alt="">
					<span>可可家</span>
				</li>
				<li>
					<!-- 电话 -->
					<img src="../../assets/img/lianxiwomen.png" alt="">
					<span>可可家</span>
				</li>
				<li>
					<!-- 传真 -->
					<img src="../../assets/img/printing.png" alt="">
					<span class="bgc">可可家</span>
				</li>
			</ul>
		</div>
		<div class="cdetails-delete">
			<span>联系人信息（长按信息可以删除）</span>
			<img src="../../assets/img/contact_add.png" alt="" @click="addInfo">
		</div>
		<div class="cdetails-user">
			<div class="cdetails-user-me">
				<div>
					<span>{{name}}</span>
					<span>{{phone}}</span>
					<span>{{email}}</span>
				</div>
				<img class="update" src="../../assets/img/pen.png" @click="updateInfo" alt="">
			</div>
		</div>
		<div class="cdetails-img">
			<img class="img-i" src="../../assets/img/icon__in.png" alt="">
			<div>
				<img src="../../assets/img/liyan.jpg" alt="">
				<span>李艳彪</span>
			</div>
			<img class="img-y" src="../../assets/img/arrow.png" alt="">
		</div>
		<div class="cdetails-btn">
			<button @click="deleteCustomerInfo">删除</button>
			<button @click="updateCustomerInfo">修改</button>
		</div>
		<add-contact :name="updatename" :phone="updatephone" :email="updateemail" @SaveAdd="SaveAdd" v-if="showAddContact">

		</add-contact>
	</div>
</template>

<script>
import AddContact from 'base/AddContact'
export default {
	components:{
		AddContact
	},
  data() {
    return {
			name:'',
			phone:'',
			email:'',
			updatename:'',
			updatephone:'',
			updateemail:'',
			showAddContact:false
		};
	},
	methods:{
		goDetails () {},
		updateInfo () {
			this.updatename = this.name
			this.updatephone = this.phone
			this.updateemail = this.email
			this.showAddContact = true
		},
		addInfo () {
			this.updatename = ''
			this.updatephone = ''
			this.updateemail = ''
			this.showAddContact = true
		},
		SaveAdd () {
			this.showAddContact = false
		},
		// 删除
		deleteCustomerInfo () {},
		// 修改
		updateCustomerInfo () {
			this.$router.push('/AddCustomer')
		}
	},
	created () {
		this.name=this.$route.query.name
		this.phone=this.$route.query.phone
		this.email=this.$route.query.email
	}
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.cdetails {
	&-title {
		.f-d-f;
		.f-fd-c;
		border-bottom:1px solid #e5e5e5;
		padding:10px 10px;
		p {
			color:#333;
			font-size:14px;
		}
		span {
			color:#999;
			font-size:14px;
			margin-top:8px;
		}
	}
	&-list {
		ul{
			width:100%;
			.f-d-f;
			.f-fd-c;
			li{
				height:42px;
				.f-d-f;
				.f-ai-c;
				padding:0 10px;
				border-bottom:1px solid #e5e5e5;
				span {
					color:#333;
					font-size:14px;
					margin-left:10px;
					.f-f-1;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.bgc {
					color:#2D75EE;
				}
				img {
					width:16px;
				}
			}
		}
	}
	&-delete {
		height:42px;
		padding:0 10px;
		border-bottom:1px solid #e5e5e5;
		.f-d-f;
		.f-jc-sb;
		.f-ai-c;
		span {
			color:#333;
			font-size:14px;
		}
		img {
			width:20px;
		}
	}
	&-user {
			border-bottom:1px solid #e5e5e5;
			padding:8px 10px;
			&-me {
				width:100%;
				.f-d-f;
				.f-jc-sb;
				.f-ai-c;
				padding:8px 14px;
				background-color:#efeff4;
				border-radius: 6px;
				div {
					.f-f-1;
					.f-d-f;
					.f-fd-c;
					span {
						color: #2D75EE;
						font-size:14px;
						margin-top:6px;
					}
					span:first-child {
						margin-top:0;
					}
				}
				.update {
					width:20px;
				}
			}
	}
	&-img {
		padding:10px;
		border-bottom:1px solid #e5e5e5;
		.f-d-f;
		.f-ai-c;
		.f-jc-sb;
		.img-i{
			width:20px;
		}
		.img-y {
			width:14px;
		}
		div {
			.f-f-1;
			.f-d-f;
			.f-fd-c;
			padding-left:14px;
			img {
				width:32px;
			}
			span {
				color:#333;
				font-size:14px;
				margin-top:4px;
			}
		}
	}
	&-btn {
		margin-top:20px;
		padding:0 10px;
		.f-d-f;
		.f-jc-sb;
		button {
			width:40%;
			height:40px;
			line-height: 40px;
			text-align: center;
			font-size:14px;
			color:#fff;
			background-color:#ccc;
		}
		button + button {
			background-color: #2D75EE;
			color:#fff;
		}
	}
}
</style>
