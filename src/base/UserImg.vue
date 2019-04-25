<template>
  <div class="user-img">
		<p>{{title}}</p>
		<img @click="$router.push('/User')" :src="userImg" alt="">	
	</div>  
</template>

<script>
export default {
	props:['title'],
	data () {
		return {
			userImg:window.localStorage.getItem('loginHeadUrl')
		}
	}
}
</script>

<style lang="less" scoped>
@import '../assets/css/flex.less';
.user-img {
	position:fixed;
  top:0;
	left:0;
	right:0;
  width: 100%;
  height: 60px;
	background:#fff;
	padding:0 20px;
	top:0px;
	z-index:9990;
	.f-d-f;
	.f-fd-r;
	.f-ai-c;
	.f-jc-sb;
	img {
		width:35px;
		height:35px;
		border-radius: 50%;
	}
	p {
		color:#000;
		font-weight: bold;
		font-size:24px;
	}
}
</style>
