<template>
  <div>
    <div class="ContactList-header">
      <mt-search
       @input="getNiuFaUser()"
      
        class="ContactList-header-search"
        v-model="keyword"
        cancel-text="取消"
        placeholder="搜索"
        :show="true"
      >

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
      </mt-search>
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
        keyword:this.keyword
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
  &-header {
    background: #fff;
    position: fixed;
    top: 0;
    width: 100%;
   
  }

  &-list {
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
