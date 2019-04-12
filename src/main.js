// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { DatetimePicker } from 'mint-ui';
import { Search } from 'mint-ui';
import { Loadmore } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import 'mint-ui/lib/style.css'


Vue.component(Loadmore.name, Loadmore);
Vue.component(MessageBox.name,MessageBox)
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Search.name, Search);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
