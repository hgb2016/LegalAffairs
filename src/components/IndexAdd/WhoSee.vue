<template>
<div class="who-see">
    <ul>
        <li v-for="(item,index) in seeLists" :key="index">
          <div>
            <img :src="item.headUrl" alt="">
            <span>{{item.userName}}</span>
            <img class="see-del" @click="deleteSee(item.workId)" src="../../assets/img/icon_dele.png" alt="">
          </div>
        </li>
		</ul>
    <button class="who-see-btn" @click="showFriends=true">添加谁可见人员</button>
    <see-lists :showFriends="showFriends" @close_Friends="close_Friends" :contactlist="contactlist"></see-lists>
    <error-remind
		v-if="showRemind"
		@Close_errorMind="showRemind = false"
		:errorRemind="errorRemind"
	></error-remind>
</div>
</template>

<script>
import ErrorRemind from "base/ErrorRemind.vue";
import postHttp from "../../assets/js/postHttp.js";
import SeeLists from "base/SeeLists.vue";
import { MessageBox } from 'mint-ui';

export default {
  components:{
    SeeLists,
    ErrorRemind
  },
  data() {
    return {
      firendLists: [],
      showFriends:false,
      contactlist:[],
      choiceUserListsParents:[],
      seeLists:[],
			showRemind:false,
			errorRemind:''
    };
  },
  methods: {
    close_Friends(data) {
      this.showFriends = false;
      if (data) {
        this.getNiuFaUser()
      }
    },
    deleteSee (wordId) {
      MessageBox.confirm('确定移除他?').then(action => {
        this.deletewWho(wordId);
      });
    },
    
    async deletewWho (workId) {
      const { data } = await postHttp.post("/User/delUserShow", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken"),
        workId:workId
      });
      if (!data.error) {
        this.showRemind = true;
        this.errorRemind = "删除成功";
        this.getNiuFaUser();
        setTimeout(() => {
          this.showRemind = false;
        }, 2000);
      }
    },
    async getUserShow() {
      const { data } = await postHttp.post("/User/getUserShow", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken")
      });
      if (!data.error) {
        this.seeLists = data.data
        data.data.forEach(m => {
          this.contactlist.forEach((v,index)=>{
            if (v.userId === m.workUserId) {
              this.contactlist.splice(index,1)
            }
          })
        });
      } else {
        alert(data.message);
      }
    },
    // 获取用户
    async getNiuFaUser() {
      const { data } = await postHttp.post("/Index/getNiuFaUser", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken")
      });
      if (!data.error) {
        this.contactlist = data.data;
        this.getUserShow()
      } else {
        alert(data.message);
      }
    },
  },
  created() {
    this.getNiuFaUser();
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.who-see {
  padding-top:38px;
  ul {
    width: 100%;
    .f-d-f;
    .f-fd-c;
    li {
      height: 50px;
      .f-d-f;
      .f-ai-c;
      .f-jc-sb;
      padding: 0 10px;
      border-bottom: 1px solid #e5e5e5;
      div {
        .f-d-f;
        .f-ai-c;
        .f-f-1;
				position: relative;
        img {
          border-radius: 50%;
          height: 36px;
          width: 36px;
          margin-left: 4px;
        }
        span {
          font-size: 14px;
          color: #333;
          margin-left: 4px;
				}
				.see-del {
					position: absolute;
					top:50%;
					transform: translateY(-50%);
          width:18px;
          height: 18px;
					right:4px;
				}
      }
    
    }
  }
  &-btn{
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 40px;
    background: #2d75ee;
    font-size: 15px;
    color: white;
  }
}
</style>
