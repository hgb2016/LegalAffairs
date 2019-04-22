<template>
  <div class="addfriends" :style="rightTransition" @click.self="closeFriend">
   
    <div class="addfriends-sale">
		 <div class="addfriends-header">
		  <p></p>
			<h4>我的好友</h4>
			<p style="color:#0c7dff" @click="surePreservation">确定</p>
		</div>
		<div class="addfriends-sale-list">
			<ul>
				<li v-for="(item,index) in contactlist" :key="index" @click="choiceNow(item.userId,index)">
					<div>
						<template v-if="index !== idx">
							<img src="../assets/img/icon_checkempty.png" alt="">
						</template>
						<template v-else>
							<img src="../assets/img/check_green.png" alt="">
						</template>
						<img :src="item.headUrl" alt="">
						<span>{{item.userName}}</span>
					</div>
					<!-- <img class="arrow" src="../assets/img/arrow.png" alt=""> -->
				</li>
			</ul>
		</div>
	</div>
	<error-remind
		v-if="showRemind"
		@Close_errorMind="showRemind = false"
		:errorRemind="errorRemind"
	></error-remind>
</div>
</template>
<script>
import ErrorRemind from "base/ErrorRemind.vue";
import postHttp from "../assets/js/postHttp.js";
export default {
	components:{
		ErrorRemind
	},
  props: {
    showFriends: {
      type: Boolean
		},
		contactlist:{
			type:Array
		},
		seeLists:{
			type:Array
		}
  },
  data() {
    return {
      right: -100,
			choiceUserLists:[],
			idx:-1,
			seeOne:'',
			showRemind:false,
			errorRemind:''
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
		async surePreservation () {
      const { data } = await postHttp.post("/User/addUserShow", {
        loginUserId: window.localStorage.getItem("loginUserId"),
				logintoken: window.localStorage.getItem("logintoken"),
				workUserId:this.seeOne
      });
      if (!data.error) {
				this.showRemind = true
				this.errorRemind = '添加成功'
				setTimeout(()=>{
					this.showRemind = false
					this.$emit('close_Friends',true)
				},2000)
      } else {
        alert(data.message);
      }
		},
		closeFriend () {
			this.$emit('close_Friends')
		},
		choiceNow (userId,index) {
			if (this.idx !== index) {
				this.idx = index
				this.seeOne = userId
			} else {
				this.idx = -1
				this.seeOne = ''
			}
		},
  },
  watch: {
    showFriends(val) {
      if (val === true) {
				this.right = 0;
      } else {
				this.right = -100;
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
	&-header{
		 background-color: #fff;
		width: 80%;
		position: fixed;
		top: 0px;
		border-bottom: 1px solid #ededed;
		 padding: 10px 15px;
			.f-d-f;
			.f-fd-r;
			.f-ai-c;
			.f-jc-sb;
		p{
			font-size: 15px;
		}
	}
  &-sale {
		margin-top: 40px;
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
