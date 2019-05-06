// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { DatetimePicker } from 'mint-ui';
import { Search } from 'mint-ui';
import { Loadmore } from 'mint-ui';
import urljs from "./assets/js/getCode.js";
import axios from "axios";
import 'mint-ui/lib/style.css'


Vue.component(Loadmore.name, Loadmore);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Search.name, Search);
Vue.config.productionTip = false

router.beforeEach(async(to, from, next) => {
  let logintoken = window.localStorage.getItem("logintoken");
  //已存在用户信息直接进入页面
  if (logintoken) {
    next();
    return;
  }
  const codes = urljs.getQueryString("code");
  axios.defaults.headers["Authorization"] =
        "NTEyZDAzYWVmZDFiNWE4ZTEzMzc1YWMwOGUxZjE0ZGU=";
      axios
        .post(
          "http://m.niuer.cn/ChatbotLaw/wxLogin",
          { code: codes },
          {
            "Content-Type": "application/json; charset=UTF-8"
          }
        )
        .then(function(response) {
          if (!response.data.error) {
            window.localStorage.setItem(
              "logintoken",
              response.data.data.logintoken
            );
            window.localStorage.setItem(
              "loginUserId",
              response.data.data.loginUserId
            );
            window.localStorage.setItem(
              "loginHeadUrl",
              response.data.data.loginHeadUrl
            );
            window.localStorage.setItem(
              "email",
              response.data.data.email
            );
            router.push("/");
          } else {
            window.location.href = urljs.getUrl("/");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
