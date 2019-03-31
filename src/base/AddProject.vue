<template>
  <div class="addproject" :style="rightTransition" @click.self="$emit('close_Sale')">
		
    <div class="addproject-sale">
			<div class="addproject-sale-twoBtn">
				<span @click="goAddPro">添加</span>
				<span>确定</span>
			</div>
			<ul>
				<li v-for="(item,index) in projectLists" :key="index" @click="choiceProject(index,item.name)">
					<span v-if="index !== idx">{{item.name}}</span>
					<span v-if="index === idx" style="color:#2B6FCE">{{item.name}}</span>
					<template v-if="index === idx">
						<img :src="item.yeschoice" alt="">
					</template>
					<template v-else>
						<img :src="item.nochoice" alt="">
					</template>
				</li>
			</ul>
    </div>
</div>
</template>
<script>
import icon_checkempty from '@/assets/img/icon_checkempty.png'
import check_green from '@/assets/img/check_green.png'
export default {
	components:{
  },
	props: {
		showSale: {
			type: Boolean
		},
	},
  data () {
		return {
			right:-100,
			idx:-1,
			start:1950,
			end:2030,
			productValue: '',
			startRight:'',
			endRight: '',
			projectLists:[
				{
					name:'我是表格1',
					status:false,
					id:2,
					yeschoice:check_green,
					nochoice:icon_checkempty
				},
				{
					name:'我是表格2',
					status:false,
					id:3,
					yeschoice:check_green,
					nochoice:icon_checkempty
				},
				{
					name:'我是表格3',
					status:false,
					id:4,
					yeschoice:check_green,
					nochoice:icon_checkempty
				},
				{
					name:'我是表格4',
					status:false,
					id:5,
					yeschoice:check_green,
					nochoice:icon_checkempty
				},
				{
					name:'我是表格5',
					status:false,
					id:6,
					yeschoice:check_green,
					nochoice:icon_checkempty
				},
			]
		}
	},
	computed: {
		rightTransition () {
			return {
        right: `${this.right}%`
      }
		},
	},
	methods:{
		choiceProject (index,name) {
			if (this.idx !== index) {
				this.idx = index
			} else {
				this.idx = -1
			}
		},
		goAddPro () {
			this.$router.push('/AddPro')
		}
	},
	watch: {
		showSale (val) {
			if (val === true) {
				this.right = 0
			} else {
				this.right = -100
			}
		}
	}
}
</script>
<style lang="less" scoped>
@import '../assets/css/flex.less';
.addproject{
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
		&-twoBtn {
			.f-d-f;
			padding:10px;
			.f-d-f;
			.f-jc-sb;
			position: absolute;
			bottom:0;
			left:0;
			right:0;
			span {
				width:50%;
				height:38px;
				color:#fff;
				.f-d-f;
				.f-ai-c;
				.f-jc-c;
				background-color: #2B6FCE;
				font-size:14px;
			}
			span + span {
				background: #ccc;
				color:#333;
			}
		}
		ul {
			.f-d-f;
			.f-fd-c;
			padding-bottom:38px;
			li {
				height:60px;
				border-top:1px solid #e5e5e5;
				.f-d-f;
				.f-ai-c;
				.f-jc-sb;
				padding:0 14px;
				span {
					font-size:14px;
					color:3333;
				}
				img {
					width:14px;
				}
			}
			li:last-child {
				border-bottom:1px solid #e5e5e5;
			}
		}
	}
}

</style>
