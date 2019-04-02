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
			<div class="info" @click="openContact">
				<span>联系人信息</span>
				<img src="../../assets/img/contact_add.png" alt="">
			</div>
			<div class="cist" v-for="(item,index) in contactLists" :key="index">
				<img class="jian" src="../../assets/img/icon_dele.png" @click="deletecus(index)" alt="">
				<div>
					<span>{{item.name}}</span>
					<span>{{item.phone}}</span>
					<span>{{item.email}}</span>
				</div>
				<img class="update" src="../../assets/img/pen.png" @click="goDetails(item.name,item.phone,item.email)" alt="">
			</div>
			<div class="info-d">
				<div class="info-d-part">
					<h3>谁可见</h3>
					<div class="part-i">
						<ul>
							<li v-for="(item,index) in choiceUserLists" :key="index">
								<delete-img :item="item" @closeDelete="closeDelete"></delete-img>
							</li>
						</ul>
					</div>
				</div>
				<p>
					<img @click="goMyFriends" src="../../assets/img/contact_add.png" alt="">
				</p>
			</div>
		</div>
		<transition name="fade">
			<add-contact v-if="showContact" @SaveAdd="SaveAdd" :name="updatename" :phone="updatephone" :email="updateemail"></add-contact>
		</transition>
	</div>
</template>

<script>
import AddContact from 'base/AddContact'
import liyan from '@/assets/img/liyan.jpg'
import DeleteImg from 'base/DeleteImg'

export default {
	components:{
		AddContact,
		DeleteImg
	},
	data () {
		return {
			scaleInfo: false,
			showContact:false,
			contactLists:[
				{
					name:'李艳彪-前端',
					phone:'18618377474',
					email:'13513335747@16.com'
				}
				
			],
			updatename:'',
			updatephone:'',
			updateemail:'',
			choiceUserLists:[
				{
					name:'李艳彪',
					id:1,
					img:liyan
				},
				{
					name:'李艳彪',
					id:1,
					img:liyan
				},
				{
					name:'李艳彪',
					id:1,
					img:liyan
				}
			]
		}
	},
	methods:{
		goMyFriends () {
			this.$router.push('/MyFriends')
		},
		closeDelete () {},
		deletecus (index) {
			this.contactLists.splice(index,i)
		},
		twoScale () {
			if (this.scaleInfo === false) {
				this.scaleInfo = true
			} else {
				this.scaleInfo = false
			}
		},
		SaveAdd (val) {
			if (val) {
				this.contactLists.push(val)
			}
			this.showContact = false
		},
		goDetails (name,phone,email) {
			this.updatename = name
			this.updatephone = phone
			this.updateemail =email
			this.showContact = true
		},
		openContact () {
			this.updatename = ''
			this.updatephone = ''
			this.updateemail = ''
			this.showContact = true
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
		margin-top:38px;
		input{
			.f-f-1;
			text-align: center;
			background-color: #ccc;
			font-size:16px;
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
		.info-d {
			.f-d-f;
			.f-ai-c;
			.f-jc-sb;
			padding:0 10px;
			min-height: 50px;
			border-bottom:1px solid #e5e5e5;
			.info-d-part {
				.f-f-1;
				.f-d-f;
				.f-ai-c;
				h3 {
					color:#333;
					font-size:14px;
				}
				.part-i {
					.f-f-1;
					padding:10px 0;
					ul {
						.f-d-f;
						.f-fd-r;
						.f-fw-w;
						width:100%;
						li {
							border:none;
						}
					}
				}
			}
			p {
				img {
					width:22px;
				}
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
					font-size:14px;
				}
				input {
					text-align: right;
					font-size:14px;
					color:#333;
				}
			}
		}
		.cist {
			.f-d-f;
			border-bottom:1px solid #e5e5e5;
			.f-jc-sb;
			.f-ai-c;
			padding:8px 20px;
			div {
				.f-f-1;
				.f-d-f;
				.f-fd-c;
				padding-left:20px;
				span {
					color: #2D75EE;
					font-size:14px;
					margin-top:6px;
				}
				span:first-child {
					margin-top:0;
				}
			}
			.jian {
				width:16px;
			}
			.update {
				width:20px;
			}
		}
	}
}
</style>
