<template>
  <div id="app">
    <title-nav v-if="$route.path !== '/'"></title-nav>
    <user-img v-if="$route.path === '/' || $route.path === '/Project' || $route.path === '/Day'"></user-img>
    <router-view></router-view>
    <tab
      v-if="$route.path === '/' || $route.path === '/Project' || $route.path === '/Day' || $route.path === '/ContactList'"
      :navName="navName"
    ></tab>
  </div>
</template>

<script>
import TitleNav from "base/TitleNav";
import Tab from "base/tab";
import UserImg from "base/UserImg";
import HTTP from "./assets/js/postHttp.js";
import * as API from "./assets/js/api.js";
export default {
  components: {
    Tab,
    UserImg,
    TitleNav
  },
  name: "App",
  data() {
    return {
      navName: ""
    };
  },
  watch: {
    $route(val) {
      this.navName = val.path;
    }
  },
  methods: {
    async login() {
      const { data } = await HTTP.post("/user/login", {
        mobile: "17328373151",
        password: "123456"
      });
      console.log(data)
      if (!data.error) {
        window.localStorage.setItem('loginUserId',data.data.loginUserId)
        window.localStorage.setItem('logintoken',data.data.logintoken)
      } else {
        alert(data.message);
      }
    }
  },
  created() {
    this.navName = this.$route.path;
    this.login();
  }
};
</script>

<style style="less">
@import "./assets/css/save.css";
#app {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  padding-top: 38px;
}
</style>
