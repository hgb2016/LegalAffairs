<template>
  <div class="index">
    <div class="index-banner">
      <img src="http://api.niuer.cn:9080/niufa_chatbot/upload/baner15.png" alt>
    </div>
    <div class="index-nav">
      <div v-for="(item, index) in toolList" :key="index">
        <a :href="item.url">
          <img :src="item.actionNewPic" alt>
		   </a>
          <span>{{item.actionName}}</span>
       
      </div>
      <div @click="goToolBar">
        <img src="../../assets/img/icon_more.png" alt>
        <span>更多</span>
      </div>
    </div>
    <index-list :infomationList="infomationList"></index-list>
    <div class="index-add" @click="$router.push('/AddDay')">
      <img src="../../assets/img/icon_add.png" alt>
    </div>
  </div>
</template>

<script>
import CanDemo from "base/CanDemo";
import IndexList from "base/IndexList";
import HTTP from "../../assets/js/postHttp.js";
import * as API from "../../assets/js/api.js";

export default {
  components: {
    CanDemo,
    IndexList
  },
  data() {
    return {
      loginUserId: "",
      logintoken: "",
	  toolList: [],
	  bannerList:[]
    };
  },
  created() {
    this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
	 this.getHotTool();
	 this.getBannerList();
  },
  methods: {
    goToolBar() {
      this.$router.push("/ToolBar");
    },
    async getHotTool() {
      const { data } = await HTTP.post("/Index/getHotTool", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken
      });
      if (!data.error) {
        this.toolList = data.data;
      } else {
        alert(data.message);
      }
	},
	 async getBannerList() {
      const { data } = await HTTP.post("/Index/getBannerList", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken
      });
      if (!data.error) {
        this.bannerList = data.data;
      } else {
        alert(data.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.index {
  padding: 60px 0;
  &-banner {
    padding: 0 10px;
    img {
      width: 100%;
    }
  }
  &-nav {
    .f-d-f;
    div {
		margin-top: 10px;
      .f-f-1;
      .f-d-f;
      .f-fd-c;
      padding: 10px 0;
      .f-ai-c;
      .f-jc-c;
      img {
        width: 36px;
      }
      span {
        font-size: 12px;
        color: #333;
        margin-top: 6px;
      }
    }
  }
  &-list {
    width: 100%;
    margin-top: 10px;
    ul {
      width: 100%;
      .f-d-f;
      .f-fd-c;
      li {
        border-bottom: 1px solid #e5e5e5;
        .list-time {
          .f-d-f;
          .f-fd-c;
          padding: 10px 20px;
          div {
            span {
              color: #333;
              font-size: 14px;
            }
          }
          div + div {
            .f-d-f;
            .f-fd-c;
            margin-top: 10px;
            span {
              color: #999;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  &-add {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 28px;
    height: 28px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
