<template>
  <div class="addfriends" :style="rightTransition" @click.self="closeFriend">
    <div class="addfriends-sale">
			<div class="addfriends-sale-choice" v-if="choiceUserLists.length>0">
				<ul>
					<li v-for="(item,index) in choiceUserLists" :key="index">
						<delete-img :item="item" @closeDelete="closeDelete"></delete-img>
					</li>
				</ul>
			</div>
			<div class="addfriends-sale-list">
				<ul>
					<li v-for="(item,index) in contactlist" :key="index" @click="choiceNow(item.status,item.name,item.headUrl,item.id)">
						<div>
							<template v-if="item.status === false">
								<img src="../assets/img/icon_checkempty.png" alt="">
							</template>
							<template v-else>
								<img src="../assets/img/check_green.png" alt="">
							</template>
							<img :src="item.headUrl" alt="">
							<span>{{item.userName}}</span>
						</div>
						<img class="arrow" src="../assets/img/arrow.png" alt="">
					</li>
				</ul>
			</div>
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
  props: {
    showFriends: {
      type: Boolean
		},
		contactlist:{
			type:Array
		},
		choiceUserListsParents:{
			type:Array
		}
  },
  data() {
    return {
      right: -100,
			choiceUserLists:[]
		};
  },
  computed: {
    rightTransition() {
      return {
        right: `${this.right}%`
      };
    }
  },
  methods: {
		closeFriend () {
			this.$emit('close_Friends',this.choiceUserLists)
		},
		choiceNow (status,name,img,id) {
			if (status === false) {
				this.contactlist.forEach ((v,index)=>{
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
				this.contactlist.forEach (v=>{
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
  },
  watch: {
    showFriends(val) {
      if (val === true) {
        this.right = 0;
      } else {
        this.right = -100;
      }
		},
		choiceUserListsParents: {
			handler (val) {
				this.choiceUserLists = val
					val.forEach(v=>{
						this.contactlist.forEach(m=>{
							if (v.id === m.id) {
								m.status = true
							}
						})
					})
			}
		}
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/flex.less";
.addfriends {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  right: -100%;
  transition: right 0.2s;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  overflow: hidden;
  .f-d-f;
  .f-fd-rr;
  &-sale {
    width: 80%;
    height: 100%;
    background-color: #fff;
    overflow-y: scroll;
    .f-d-f;
    .f-fd-c;
    position: relative;
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
				margin-top:10px;
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
								border-radius: 50%;
								height: 35px;
								width: 35px;
								margin-left:10px;
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
}
</style>
