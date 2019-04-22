<template>
  <div>
    <div class="ContactList-header">
     <div  class="ContactList-weichat">
       <img src="../../assets/img/icon_weichat.png" alt="">
       <p>微信添加好友</p>
     </div>
      <div class="ContactList-header-search">
        <input @input="getNiuFaUser()" v-model="keyword" type="text" placeholder="请输入关键字">
        <i></i>
      </div>
    </div>
    <div class="ContactList-list">
      <div
        class="ContactList-list-item"
        v-for="(item,index) in contactlist"
        :key="index"
        @click="goContactInfo(item)"
      >
        <img :src="item.headUrl" alt>
        <p>{{item.userName}} &nbsp; {{item.mobilePhone}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import postHttp from "../../assets/js/postHttp.js";

export default {
  data() {
    return {
      loginUserId: "",
      logintoken: "",
      contactlist: [],
      keyword: ""
    };
  },
  created() {
    this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
    this.getNiuFaUser();
  },
  methods: {
    goContactInfo(item) {
      console.log(item);
      this.$router.push({ path: "/ContactInfo", query: { userinfo: item } });
    },
    async getNiuFaUser() {
      const { data } = await postHttp.post("/Index/getNiuFaUser", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken,
        keyword: this.keyword
      });
      if (!data.error) {
        this.contactlist = data.data;
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
  &-weichat{
    width: 100%;
    .f-d-f;
      .f-fd-c;
      .f-ai-c;
      font-size: 14px;
      img{
        margin-top: 10px;
        margin-bottom: 10px;
        width: 40px;
      }
      p{
        margin-bottom: 10px;
      }
  }
  &-header {
    background: #fff;
    position: fixed;
    top: 60px;
    width: 100%;
    &-search {
      margin: 0px 20px 10px;
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
        width: 100%;
        font-size: 12px;
        color: #333;
      }
    }
  }

  &-list {
    padding: 100px 0px 60px;
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
