<template>
  <div id="app">
    <title-nav v-if="$route.path !== '/' && $route.path !== '/Project' && $route.path !== '/Day' && $route.path !=='/ContactList'" :title="title"></title-nav>
    <user-img v-if="$route.path === '/' || $route.path === '/Project' || $route.path === '/Day'|| $route.path === '/ContactList'" :title="title"></user-img>
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
import postHttp from "./assets/js/postHttp.js";

import ErrorRemind from "base/ErrorRemind.vue";
export default {
  components: {
    Tab,
    UserImg,
    TitleNav,
    ErrorRemind
  },
  name: "App",
  data() {
    return {
      navName: "",
      title:'',
      errorRemind:'',
      showRemind:false,
    };
  },
  watch: {
    $route(val) {
      this.title = val.meta.title
      this.navName = val.path;
    }
  },
  methods: {
    async login() {
      const { data } = await postHttp.post("/user/login", {
        mobile: "17328373151",
        password: "123456"
      });
      if (!data.error) {
        window.localStorage.setItem('loginUserId',data.data.loginUserId)
        window.localStorage.setItem('logintoken',data.data.logintoken)
        window.localStorage.setItem('loginHeadUrl',data.data.loginHeadUrl)
      } else {
        this.errorRemind=data.message
        this.showRemind=true
        
      }
    }
  },
  created() {
    this.title = this.$route.meta.title
    this.navName = this.$route.path;
   // this.login();
  },
};
</script>

<style style="less">
@import "./assets/css/save.css";
#app {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
}
</style>
