import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = () => new Vuex.Store({
	state: {
		loginUserId: window.localStorage.getItem("loginUserId"),
		logintoken: window.localStorage.getItem("logintoken"),
	},
	getters: {
		getUserId(state) {
			return state.loginUserId
		},
		gettoken(state) {
			return state.logintoken
		}
	},
	mutations: {

	},
	actions: {

	}
})

export default store