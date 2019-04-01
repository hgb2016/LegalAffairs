<template>
  <div class="user-img">
		<img @click="$router.push('/User')" src="../assets/img/liyan.jpg" alt="">	
	</div>  
</template>

<script>
export default {

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
	top:38px;
	z-index:9999;

	.f-d-f;
	.f-fd-rr;
	.f-ai-c;
	img {
		width:36px;
		border-radius: 50%;
	}
}
</style>
