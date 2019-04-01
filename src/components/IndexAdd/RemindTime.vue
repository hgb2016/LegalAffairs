<template>
  <div class="remind-time">
		<error-remind  v-if="showRemind" @Close_errorMind="showRemind = false" :errorRemind="errorRemind"></error-remind>
		<ul>
			<li @click="noRemind">
				<span>
					不提醒
				</span>
				<img v-if="showNo" src="../../assets/img/check_green.png" alt="">
			</li>
			<li v-for="(item,index) in timeLists" :key="index" @click="choiceTime(item.status,item.mark,index)">
				<span>{{item.name}}</span>
				<template v-if="item.status === true">
					<img src="../../assets/img/check_green.png" alt="">
				</template>
			</li>
		</ul>
		<p>确定</p>
	</div>
</template>

<script>
import ErrorRemind from 'base/ErrorRemind'
export default {
	components:{
		ErrorRemind
	},
	data () {
		return {
			timeLists:[
				{
					name:'准点提醒',
					status:false,
					mark:'nowTime'
				},
				{
					name:'提前15分钟',
					status:false,
					mark:'fivety'
				},
				{
					name:'提前30分钟',
					status:false,
					mark:'thirdty'
				},
				{
					name:'提前1小时',
					status:false,
					mark:'oneHour'
				},{
					name:'提前1天',
					status:false,
					mark:'oneDay'
				}
			],
			showNo:false,
			showRemind:false,
			errorRemind:''
		}
	},
	methods: {
		choiceTime (status,mark,index) {
			this.showNo = false
			if (this.timeLists[index].status === false) {
				let idx = 0
				this.timeLists.forEach(v=>{
					if (v.status === true) {
						idx++
					}
				})
				console.log(idx)
				if (idx >= 3) {
					this.showRemind = true
					this.errorRemind = '最多选择3个'
					setTimeout(()=>{
						this.showRemind = false
						this.errorRemind = ''
					},1000)
				} else {
					this.timeLists[index].status = true
				}
				console.log(this.timeLists)
			} else {
				this.timeLists[index].status = false
			}
		},
		noRemind () {
			this.showNo = true
			this.timeLists.forEach(v=>{
				v.status = false
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/css/flex.less';
.remind-time{
	padding-top:38px;
	.f-d-f;
	.f-fd-c;
	.f-jc-sb;
	min-height: 100vh;
	width:100%;
	ul{
		.f-d-f;
		.f-fd-c;
		width:100%;
		li{
			padding:0 10px;
			height:40px;
			border-bottom:1px solid #e5e5e5;
			.f-d-f;
			.f-ai-c;
			.f-jc-sb;
			span {
				font-size:14px;
				color:#333;
			}
			img {
				width:18px;
			}
		}
		li:first-child {
			height:50px;
		}
	}
	p {
		height:40px;
		.f-d-f;
		.f-ai-c;
		.f-jc-c;
		color:#409EFF;
		font-size:14px;
		border-top:1px solid #e5e5e5;
	}
}
</style>
