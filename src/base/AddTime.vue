<template>
  <div class="addtime" :style="rightTransition" @click.self="closeTime">
    <div class="addtime-sale">
			<ul>
				<li @click="noRemind">
					<span>
						不提醒
					</span>
					<img v-if="showNo" src="../assets/img/check_green.png" alt="">
				</li>
				<li v-for="(item,index) in timeLists" :key="index" @click="choiceTime(item.status,item.mark,index)">
					<span>{{item.name}}</span>
					<template v-if="item.status === true">
						<img src="../assets/img/check_green.png" alt="">
					</template>
				</li>
			</ul>
			<error-remind  v-if="showRemind" @Close_errorMind="showRemind = false" :errorRemind="errorRemind"></error-remind>
    </div>
</div>
</template>
<script>
import ErrorRemind from 'base/ErrorRemind'
export default {
	props:['showTime','timeString'],
	components:{
		ErrorRemind
	},
	data () {
		return {
			timeLists:[
				{
					name:'准点提醒',
					status:true,
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
			errorRemind:'',
			right:-100,
		}
	},
	computed: {
		rightTransition () {
			return {
        right: `${this.right}%`
      }
		},
	},
	watch:{
		showTime (val) {
			if (val === true) {
				this.right = 0
			} else {
				this.right = -100
			}
		},
		timeString:{
			handler (val) {
				val.forEach(a=>{
					this.timeLists.forEach(e=>{
						if (e.name === a) {
							e.status = true
						}
					})
				})
			},
			immediate:true
		}
	},
	methods: {
		closeTime () {
			let newString = []
			this.timeLists.forEach(v=>{
				if(v.status === true) {
					newString.push(v.name)
				}
			})
			this.$emit('close_Time',newString)
		},
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
@import '../assets/css/flex.less';
.addtime{
	width:100%;
	height:100vh;
	position: fixed;
	top:0;
	bottom:0;
	right:-100%;
	transition:right .2s;
	background-color: rgba(0, 0, 0, 0.6);
	z-index:9999;
	overflow: hidden;
	.f-d-f;
	.f-fd-rr;
	&-sale{
		width:80%;
		height:100%;
		background-color: #fff;
		overflow-y: scroll;
		.f-d-f;
		.f-fd-c;
		position: relative;
		ul{
			.f-d-f;
			.f-fd-c;
			width:100%;
			li{
				padding:0 10px;
				height:50px;
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
}

</style>
