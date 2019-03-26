<template>
  <div id="app">
    <user-img v-if="$route.path === '/' || $route.path === '/Project' || $route.path === '/Day'"></user-img>
    <router-view></router-view>
    <tab v-if="$route.path === '/' || $route.path === '/Project' || $route.path === '/Day' || $route.path === '/MailList'" :navName="navName"></tab>
  </div>
</template>

<script>
import Tab from "./base/tab";
import UserImg from "./base/UserImg";
export default {
  components:{
    Tab,
    UserImg
  },
  name: 'App',
  data () {
    return {
      navName:''
    }
  },
  watch: {
    $route(val) {
      this.navName = val.path;
    }
  },
  created () {
    this.navName = this.$route.path
  }
}
</script>

<style style="less">
@import "./assets/css/save.css";
#app {
  width:100vw;
  min-height:100vh;
  background: #fff;
}
</style>
