<template>
<div class="title-nav">
	<img @click="$router.go(-1)" src="../assets/img/back.png" alt="">
	<h4>{{title !== ''?title:'编辑'}}</h4>
	<span></span>
</div>
</template>

<script>
export default {
props:['title']
}
</script>

<style lang="less" scoped>
@import '../assets/css/flex.less';
.title-nav {
	position: fixed;
	top:0;
	left:0;
	right:0;
	height:38px;
	background-color:#fff;
	padding:0 10px;
	.f-d-f;
	.f-ai-c;
	.f-jc-sb;
	z-index:9998;
	border-bottom:1px solid #e5e5e5;
	img {
		width:20px;
	}
	span {
		width:20px;
	}
}
</style>
