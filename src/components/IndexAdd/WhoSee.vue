<template>
<div class="who-see">
    <ul>
      <template v-if="repeatLists.length  === 0">
        <li v-for="(item,index) in seeLists" :key="index">
          <div>
            <img :src="item.headUrl" alt="">
            <span>{{item.userName}}</span>
            <img class="see-del" src="../../assets/img/icon_dele.png" alt="">
          </div>
        </li>
      </template>
			<template v-if="repeatLists.length > 0">
        <li v-for="(item,index) in repeatLists" :key="index">
          <div>
            <img :src="item.img" alt="">
            <span>{{item.name}}</span>
            <img class="see-del" src="../../assets/img/icon_dele.png" alt="">
          </div>
        </li>
      </template>
		</ul>
    <button class="who-see-btn" @click="showFriends=true">添加谁可见人员</button>
    <add-friends :choiceUserListsParents="choiceUserListsParents" :showFriends="showFriends" @close_Friends="close_Friends" :contactlist="contactlist"></add-friends>
</div>
</template>

<script>
import postHttp from "../../assets/js/postHttp.js";
import AddFriends from "base/AddFriends.vue";

export default {
  components:{
    AddFriends
  },
  data() {
    return {
      firendLists: [],
      showFriends:false,
      contactlist:[],
      choiceUserListsParents:[],
      seeLists:[],
      repeatLists:[]
    };
  },
  methods: {
    close_Friends(data) {
      console.log(data)
      if (data) {
        this.repeatLists = data
        this.choiceUserListsParents = data;
        this.showFriends = false;
      }
    },
    async getUserShow() {
      const { data } = await postHttp.post("/User/getUserShow", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken")
      });
      if (!data.error) {
        this.seeLists = data.data
        data.data.forEach(v => {
          let newUsers = {};
          newUsers["id"] = v.workUserId;
          newUsers["img"] = v.headUrl;
          newUsers["name"] = v.userName;
          this.choiceUserListsParents.push(newUsers);
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
        data.data.forEach(v => {
          v.status = false;
        });
        this.contactlist = data.data;
        this.getUserShow()
      } else {
        alert(data.message);
      }
    },
    async addUserShow () {

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
