<template>
<div class="day">
	<can-demo :infomationList="infomationList"></can-demo>
	<index-list :infomationList="infomationList"></index-list>
	<div class="day-add" @click="$router.push('/AddDay')">
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
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/css/flex.less';
.day {
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
