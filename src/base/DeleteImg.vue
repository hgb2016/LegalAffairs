<template>
  <div class="delete-img">
		<img :src="item.img" alt="">
		<span>{{item.name}}</span>
		<img class="del" v-if="!details" src="../assets/img/icon_dele.png" alt="" @click="deleteUser(item.id)">
	</div>
</template>

<script>
export default {
	props:['item','details'],
	methods:{
		deleteUser (id) {
			this.$emit('closeDelete',id)
		}
	}
}
</script>

<style lang="less" scoped>
@import "../assets/css/flex.less";
.delete-img {
	.f-d-f;
	.f-fd-c;
	.f-ai-c;
	padding:8px;
	position: relative;
	img {
		width:35px;
		height:35px;
		border-radius: 50%;
	}
	span {
		font-size:12px;
		color:#333;
		margin-top:4px;
	}
	.del {
		position: absolute;
		right:0;
		top:0;
		width:14px;
		height:14px;
	}
}
</style>
