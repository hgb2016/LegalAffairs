<template>
<div class="user">
	<div class="user-info">
		<div class="user-info-nav" @click="goSet">
			<p>
				<span>
					李艳彪
				</span>
				<span>
					北京熙呈互动科技有限公司
				</span>
			</p>
			<img src="../../assets/img/liyan.jpg" alt="">
		</div>
	</div>
	<div class="user-list">
		<admin-list></admin-list>
	</div>
</div>
</template>

<script>
import AdminList from 'base/AdminList'
export default {
	components:{
		AdminList
	},
	methods: {
		goSet () {
			this.$router.push('/UserSet')
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/css/flex.less';
.user {
	.f-d-f;
	.f-ai-c;
	.f-fd-c;
	&-info {
		width: 100%;
		padding:0 10px;
		margin-top:38px;
		&-nav {
			min-height:100px;
			box-shadow: 5px 5px 5px #f3f3f3, 5px -5px 5px #f3f3f3,
				-5px 5px 5px #f3f3f3, -5px -5px 5px #f3f3f3;
				margin-top:10px;
			.f-d-f;
			.f-ai-c;
			padding:0 10px;
			border-radius: 4px;
			img {
				width:40px;
				border-radius: 50%;
			}
			p {
				.f-f-1;
				.f-d-f;
				.f-fd-c;
				span {
					font-size:20px;
					color:#333;
				}
				span + span {
					font-size:14px;
					color:#666;
					margin-top:8px;
				}
			}
		}
	}
	&-list{
		width:100%;
	}
}
</style>
