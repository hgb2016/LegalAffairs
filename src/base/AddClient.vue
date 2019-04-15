<template>
  <div class="addproject" :style="rightTransition" @click.self="closeSale">
    <div class="addproject-sale">
			<ul>
				<li v-for="(item,index) in clientLists" :key="index" @click="choiceClient(item.clientName,item.clientId)">
					<span v-if="item.clientId !== proId">{{item.clientName}}</span>
					<span v-if="item.clientId === proId" style="color:#2B6FCE">{{item.clientName}}</span>
					<template v-if="item.clientId !== proId">
						<img src="../assets/img/icon_checkempty.png" alt="">
					</template>
					<template v-else>
						<img src="../assets/img/check_green.png" alt="">
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
		showClient: {
			type: Boolean
		},
		clientLists:{
			tpe:Array
		},
		clientId: {
			type:String
		}
	},
  data () {
		return {
			right:-100,
			productValue: '',
			proName:'',
			proId:''
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
		choiceClient (name,id) {
			if (this.proId !== id) {
				this.proName = name
				this.proId = id
			} else {
				this.proName = ''
				this.proId = ''
			}
		},
		goAddPro () {
			this.$router.push('/AddPro')
		},
		closeSale () {
			let newObj = {}
			newObj['name'] = this.proName
			newObj['id'] = this.proId
			this.$emit('close_Sale',newObj)
		}
	},
	watch: {
		showClient (val) {
			if (val === true) {
				this.right = 0
			} else {
				this.right = -100
			}
		},
		clientId:{
			handler (val) {
				this.proId = val
			},
			immediate:true
		}
	}
}
</script>
<style lang="less" scoped>
@import '../assets/css/flex.less';
.addproject{
	width:100vw;
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
		height:100vh;
		background-color: #fff;
		position: relative;
		overflow-y: scroll;
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
