<template>
  <div class="my-customer">
		<div class="my-customer-search">
			<div>
				<input type="text" placeholder="搜索企业名称" v-model="enterpriseName">
				<i @click="searchBtn"></i>
			</div>
			<p @click="goAdd">添加客户</p>
		</div>
		<div class="my-customer-list">
			<ul> 
				<li v-for="(item,index) in customerList" :key="index" @click="CustomerDetails(item.clientId)">
					<span>{{item.clientName}}</span>
					<span>{{item.clientAddress}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import postHttp from "../../assets/js/postHttp.js";

export default {
  data() {
    return {
			enterpriseName: "",
			customerList:[
				{
					name:'李艳彪',
					post:'前端开发工程师'
				},
				{
					name:'侯国兵',
					post:'原生开发'
				}
			]
    };
	},
	created () {
		this.getClientList()
	},
  methods: {
		async getClientList () {
			const { data } = await postHttp.post("/Client/getClientList", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken:window.localStorage.getItem("logintoken"),
			});
			console.log(data)
      if (!data.error) {
        this.customerList = data.data;
      } else {
        alert(data.message);
      }
		},
		searchBtn() {},
		goAdd () {
			this.$router.push('/AddCustomer')
		},
		CustomerDetails (id) {
			this.$router.push(`/CustomerDetails?CustomerDetails=${id}`)
		}
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.my-customer {
  &-search {
		height:50px;
		.f-d-f;
		.f-ai-c;
		.f-jc-c;
		border-bottom:1px solid #e5e5e5;
		position: fixed;
		top:38px;
		left:0;
		right: 0;
		padding:0 20px;
		background-color: #fff;
    div {
			.f-f-1;
			.f-d-f;
			height:30px;
			border:1px solid #e5e5e5;
			border-radius: 30px;
			.f-d-f;
			.f-jc-sb;
			.f-ai-c;
			padding: 0 10px;
			i {
				background-image: url("../../assets/img/icon_search.png");
				width: 26px;
				height: 26px;
				background-size: 100% 100%;
			}
			input {
				font-size: 14px;
				color: #333;
			}
		}
		p{
			color:#333;
			font-size:14px;
			margin-left: 10px;
		}
	}
	&-list {
		padding-top:88px;
		ul{
			width:100%;
			.f-d-f;
			.f-fd-c;
			li{
				border-bottom:1px solid #e5e5e5;
				.f-d-f;
				.f-fd-c;
				.f-jc-c;
				padding:0 20px;
				height:60px;
				span {
					color:#333;
					font-size:14px;
				}
				span + span {
					font-size:12px;
					color:#666;
					margin-top:6px;
				}
			}
		}
	}
}
</style>
