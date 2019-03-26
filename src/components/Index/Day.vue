<template>
<div class="Day">
	<can-demo :infomationList="infomationList"></can-demo>
	<index-list :infomationList="infomationList"></index-list>
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

</style>
