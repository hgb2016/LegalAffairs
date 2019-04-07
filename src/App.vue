<template>
  <div id="app">
    <title-nav v-if="$route.path !== '/' && $route.path !== '/Project' && $route.path !== '/Day' && $route.path !=='/ContactList'"></title-nav>
    <user-img v-if="$route.path === '/' || $route.path === '/Project' || $route.path === '/Day'" :title="title"></user-img>
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
export default {
  components: {
    Tab,
    UserImg,
    TitleNav
  },
  name: "App",
  data() {
    return {
      navName: "",
      title:''
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
        mobile: "18232518065",
        password: "Yibing1116"
      });
      if (!data.error) {
        window.localStorage.setItem('loginUserId',data.data.loginUserId)
        window.localStorage.setItem('logintoken',data.data.logintoken)
      } else {
        alert(data.message);
      }
    }
  },
  created() {
    this.title = this.$route.meta.title
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
}
</style>
