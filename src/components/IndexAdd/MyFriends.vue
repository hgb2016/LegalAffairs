<template>
<div class="my-firends">
	<div class="my-firends-choice" v-if="choiceUserLists.length>0">
		<ul>
			<li v-for="(item,index) in choiceUserLists" :key="index">
				<delete-img :item="item" @closeDelete="closeDelete"></delete-img>
			</li>
		</ul>
	</div>
	<div class="my-firends-list">
		<ul>
			<li v-for="(item,index) in firendLists" :key="index" @click="choiceNow(item.status,item.name,item.userimg,item.id)">
				<div>
					<template v-if="item.status === false">
						<img :src="item.nochoice" alt="">
					</template>
					<template v-else>
						<img :src="item.yeschoice" alt="">
					</template>
					<img :src="item.userimg" alt="">
					<span>{{item.name}}</span>
				</div>
				<img class="arrow" src="../../assets/img/arrow.png" alt="">
			</li>
		</ul>
	</div>
</div> 
</template>

<script>
import icon_checkempty from '@/assets/img/icon_checkempty.png'
import check_green from '@/assets/img/check_green.png'
import liyan from '@/assets/img/liyan.jpg'
import DeleteImg from 'base/DeleteImg'
export default {
	components:{
		DeleteImg
	},
	data () {
		return {
			firendLists:[
				{
					id:3,
					status:false,
					name:'李艳彪3',
					userimg:liyan,
					nochoice:icon_checkempty,
					yeschoice:check_green,
				},
				{
					id:4,
					status:false,
					name:'李艳彪4',
					userimg:liyan,
					nochoice:icon_checkempty,
					yeschoice:check_green,
				},
			],
			choiceUserLists:[]
		}
	},
	methods:{
		choiceNow (status,name,img,id) {
			if (status === false) {
				this.firendLists.forEach ((v,index)=>{
					if (v.id === id) {
						let newObj = {}
						newObj['name'] = name
						newObj['img'] = img
						newObj['id'] = id
						this.choiceUserLists.push(newObj)
						v.status = true
					}
				})
			} else {
				this.firendLists.forEach (v=>{
					if (v.id === id) {
						this.choiceUserLists.forEach ((m,index)=>{
							if (m.id === id) {
								this.choiceUserLists.splice(index,1)
							}
						})
						v.status = false
					}
				}) 
			}
		},
		closeDelete (id) {
			this.choiceUserLists.forEach ((m,index)=>{
				if (m.id === id) {
					this.choiceUserLists.splice(index,1)
				}
			})
			this.firendLists.forEach ((v,index)=>{
				if (v.id === id) {
					v.status = false
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/css/flex.less';
.my-firends {
	.f-d-f;
	.f-fd-c;
		margin-top:38px;
	
	&-choice {
		border-bottom: 1px solid #e5e5e5;
		padding:10px;
		ul {
			.f-d-f;
			.f-fw-w;
			li{
			}
		}
	}
	&-list {
		width:100%;
		ul {
			width:100%;
			.f-d-f;
			.f-fd-c;
			li {
				height:50px;
				.f-d-f;
				.f-ai-c;
				.f-jc-sb;
				padding:0 10px;
				border-bottom:1px solid #e5e5e5;
				div {
					.f-d-f;
					.f-ai-c;
					.f-f-1;
					img {
						width:12px;
					}
					img + img {
						width:36px;
						margin-left:4px;
					}
					span {
						font-size:14px;
						color:#333;
						margin-left:4px;
					}
				}
				img {
					width:12px;
				}
			}
		}
	}
}
</style>
