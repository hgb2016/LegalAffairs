<template>
  <div class="user-list-l">
		<ul>
			<li @click="goMyCustomer">
				<div>
					<img src="../assets/img/about.png" alt="">
					<span>我的客户</span>
				</div>
			</li>
			<li @click="goWhoSee">
				<div>
					<img src="../assets/img/see.png" alt="">
					<span>谁可以看我的工作</span>
				</div>
			</li>
			<li @click="goExportDay">
				<div>
					<img src="../assets/img/banbenjieshao (1).png" alt="">
					<span>导出日程</span>
				</div>
			</li>
			<!-- <li @click="goShare">
				<div>
					<img src="../assets/img/share.png" alt="">
					<span>分享给好友</span>
				</div>
			</li> -->
			<!-- <li @click="goSuggestion">
				<div>
					<img src="../assets/img/opinion.png" alt="">
					<span>意见反馈</span>
				</div>
			</li> -->
			<!-- <li @click="goAboutUs">
				<div>
					<img src="../assets/img/about.png" alt="">
					<span>关于我们</span>
				</div>
			</li>
			<li @click="goContact">
				<div>
					<img src="../assets/img/lianxiwomen.png" alt="">
					<span>联系我们</span>
				</div>
			</li>
			<li>
				<div>
					<img src="../assets/img/banbenjieshao (1).png" alt="">
					<span>版本信息</span>
				</div>
			</li> -->
		</ul>
	</div>
</template>

<script>
export default {
	props:['email'],
	methods:{
		goMyCustomer () {
			this.$router.push('MyCustomer')
		},
		goWhoSee () {
			this.$router.push('WhoSee')
		},
		goExportDay () {
			this.$router.push(`/ExportDay?email=${this.email===null?'':this.email}`)
		},
		goShare () {},
		goSuggestion () {
			this.$router.push('/Feedback')
		},
		goAboutUs () {},
		goContact () {},
	}
}
</script>

<style lang="less" scoped>
@import '../assets/css/flex.less';
.user-list-l {
	width:100%;
	margin-top:20px;
	ul {
		.f-d-f;
		.f-fd-c;
		li {
			border-bottom:1px solid #e5e5e5;
			padding:0 10px;
			div {
				.f-d-f;
				.f-ai-c;
				height:46px;
				span {
					font-size:14px;
					color:#333;
					margin-left:0px;
				}
				img {
					width:30px;
				}
			}
		}
	}
}
</style>
