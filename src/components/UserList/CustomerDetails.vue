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
					<img src="../../assets/img/location2.png" alt="">
					<span>可可家</span>
				</li>
				<li>
					<!-- 电话 -->
					<img src="../../assets/img/iphone_red.png" alt="">
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
			<img src="../../assets/img/contact_add.png" alt="">
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
			name:'',
			phone:'',
			email:'',
		};
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
}
</style>
