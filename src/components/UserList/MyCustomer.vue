<template>
  <div class="my-customer">
		<div class="my-customer-search">
			<div>
				<input type="text" placeholder="搜索企业名称" v-model="enterpriseName" @input="searchCustomer">
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
			<h6>{{lowupdate}}</h6>
		</div>
	</div>
</template>

<script>
import postHttp from "../../assets/js/postHttp.js";

export default {
  data() {
    return {
			enterpriseName: "",
			customerList:[],
			pageNum:1,
			markCustomer:1,
			totalPages:0,
			lowupdate:''
    };
	},
	created () {
		this.getClientList()
	},
  methods: {
		searchCustomer () {
			this.pageNum = 1
			this.getClientList()
		},
		async getClientList () {
			const { data } = await postHttp.post("/Client/getClientList", {
        loginUserId: window.localStorage.getItem("loginUserId"),
				logintoken:window.localStorage.getItem("logintoken"),
				page:this.pageNum,
				keyword:this.enterpriseName
			});
      if (!data.error) {
				this.markCustomer = 0
				this.totalPages = data.totalPages
				this.customerList = []
				data.data.map(item => {
          this.customerList.push(item);
        });
				if (data.totalPages>1) {
					this.lowupdate = '加载更多'
				} else {
					this.lowupdate = ''
				}
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
		},
		 async customerScroll() {
      let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let scrollY =
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
				window.pageYOffset;
      if (
        scrollY + windowHeight === this.$el.getBoundingClientRect().height &&
        this.markCustomer === 0
      ) {
        this.markCustomer = 1;
        this.pageNum++;
        if (this.pageNum <= this.totalPages) {
					const { data } = await postHttp.post("/Client/getClientList", {
						loginUserId: window.localStorage.getItem("loginUserId"),
						logintoken:window.localStorage.getItem("logintoken"),
						page:this.pageNum
					});
					if (!data.error) {
						this.markCustomer = 0
						data.data.map(item => {
							this.customerList.push(item);
						});
						if (this.pageNum<data.totalPages) {
							this.lowupdate = '加载更多'
						} else {
							this.lowupdate = ''
						}
					}
					this.lowupdate = "加载更多";
        } else {
          this.lowupdate = "";
        }
      }
    },
	},
	mounted() {
    window.addEventListener("scroll", this.customerScroll);
	},
	beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.customerScroll);
    next();
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.my-customer {
	width:100vw;
	min-height: 100vh;
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
					font-weight: bold;
				}
				span + span {
					font-size:12px;
					color:#999;
					margin-top:6px;
				}
			}
		}
		h6 {
			width:100%;
			text-align: center;
			line-height: 26px;
			font-size:14px;
			color:#333;
		}
	}
}
</style>
