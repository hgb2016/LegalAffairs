<template>
  <div>
    <div class="ContactList-header">
      <div class="ContactList-header-search">
        <input type="text" placeholder="请输入好友名称">
        <i></i>
      </div>
    </div>
    <div class="ContactList-list">
      <div class="ContactList-list-item" v-for="(item,index) in contactlist" :key="index">
        <img :src="item.headUrl" alt>
        <p>{{item.userName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import HTTP from "../../assets/js/postHttp.js";
import * as API from "../../assets/js/api.js";

export default {
  data() {
    return {
      loginUserId: "",
      logintoken: "",
      contactlist: [
       
      ]
    };
  },
  created() {
    this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
    this.getNiuFaUser();
  },
  methods: {
    async getNiuFaUser() {
      const { data } = await HTTP.post("/Index/getNiuFaUser", {
        loginUserId: this.loginUserId,
        logintoken:this.logintoken
      });
      console.log(data);
      if (!data.error) {
          this.contactlist=data.data;
      } else {
        alert(data.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.ContactList {
  width: 100%;
  &-header {
    background: #fff;
    position: fixed;
    top: 0px;
    width: 100%;
<<<<<<< HEAD
    &-search {
      margin: 20px;
      .f-f-1;
      .f-d-f;
      height: 30px;
      border: 1px solid #e5e5e5;
      border-radius: 30px;
      background-color: #fff;
      .f-d-f;
      .f-jc-sb;
      .f-ai-c;
      padding: 0 10px;
      i {
        background-image: url("../../assets/img/icon_search.png");
        width: 26px;
        height: 26px;
        background-size: 100% 100%;
      }
      input {
        font-size: 12px;
        color: #333;
      }
=======
    padding:60px 0;
    &-header{
        background: #fff;
        position: fixed;
        top:38px;
        width: 100%;
        &-search{
            margin: 20px ;
            .f-f-1;
			.f-d-f;
			height:30px;
			border:1px solid #e5e5e5;
			border-radius: 30px;
			background-color: #fff;
			.f-d-f;
			.f-jc-sb;
			.f-ai-c;
			padding: 0 10px;
			i {
				background-image: url("../../assets/img/icon_search.png");
				width: 26px;
				height: 26px;
				background-size: 100% 100%;
			}
			input {
				font-size: 12px;
                color: #333;
                
			}
        }
>>>>>>> upstream/master
    }
  }

  &-list {
    margin-top: 60px;
    width: 100%;
    &-item {
      .f-d-f;
      .f-fd-r;
      .f-ai-c;
      border-bottom: 1px solid #ededed;
      padding: 12px 20px;
      img {
        border-radius: 50%;
        height: 35px;
        width: 35px;
      }
      p {
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
}
</style>
