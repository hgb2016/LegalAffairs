<template>
<div class="index">
	<div class="index-banner">
		<img src="../../assets/img/1.png" alt="">
	</div>
	<div class="index-nav">
		<div>
			<img src="../../assets/img/icon_ssf.png" alt="">
			<span>诉讼费计算</span>
		</div>
		<div>
			<img src="../../assets/img/icon_gs.png" alt="">
			<span>工商查询</span>
		</div>
		<div>
			<img src="../../assets/img/lvshifei.png" alt="">
			<span>律师费计算</span>
		</div>
		<div @click="goToolBar">
			<img src="../../assets/img/icon_more.png" alt="">
			<span>更多</span>
		</div>
	</div>
	<div class="index-time">
		<can-demo :infomationList="infomationList"></can-demo>
	</div>
	<index-list :infomationList="infomationList"></index-list>
	<div class="index-add" @click="$router.push('/AddDay')">
		<img src="../../assets/img/icon_add.png" alt="">
	</div>
</div>
</template>

<script>
import CanDemo from 'base/CanDemo'
import IndexList from 'base/IndexList'
export default {
	components:{
		CanDemo,
		IndexList
	},
	data () {
		return {
			infomationList:[
				{
					year:'2019年3月18',
					title:'哈哈镜',
					time:'16：35-17：35'
				},
				{
					year:'2019年3月19',
					title:'哈哈镜',
					time:'16：35-17：35'
				}
			]
		}
	},
	methods:{
		goToolBar () {
			this.$router.push('/ToolBar')
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/css/flex.less';
.index {
	padding:60px 0;
	&-banner {
		padding:0 10px;
		img {
			width:100%;
		}
	}
	&-nav {
		.f-d-f;
		div {
			.f-f-1;
			.f-d-f;
			.f-fd-c;
			padding:10px 0;
			.f-ai-c;
			.f-jc-c;
			img {
				width:36px;
			}
			span {
				font-size:12px;
				color:#333;
				margin-top:6px;
			}
		}
	}
	&-list {
		width:100%;
		margin-top:10px;
		ul {
			width:100%;
			.f-d-f;
			.f-fd-c;
			li{
				border-bottom:1px solid #e5e5e5;
				.list-time {
					.f-d-f;
					.f-fd-c;
					padding:10px 20px;
					div {
						span {
							color:#333;
							font-size:14px;
						}
					}
					div + div {
						.f-d-f;
						.f-fd-c;
						margin-top:10px;
						span {
							color:#999;
							font-size:14px;
						}
					}
				}
			}
		}
	}
	&-add{
		position: fixed;
		bottom:80px;
		right:20px;
		width:28px;
		height:28px;
		img {
			width:100%;
			height:100%;
		}
	}
}
</style>
