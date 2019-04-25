import Vue from 'vue'
import Vuex from 'vuex'
import postHttp from "../assets/js/postHttp.js";
Vue.use(Vuex)

const store = () => new Vuex.Store({
	state: {
		loginUserId: window.localStorage.getItem("loginUserId"),
		logintoken: window.localStorage.getItem("logintoken"),
		userInfo: {}
	},
	getters: {
		getUserId(state) {
			return state.loginUserId
		},
		gettoken(state) {
			return state.logintoken
		},
		getUserInfo(state) {
			return state.userInfo
		}
	},
	mutations: {
		updateUserInfo(state, payload) {
			Vue.set(state, 'userInfo', payload)
		}
	},
	actions: {
		// 获取用户的信息
		async getUserInfo(context, payload) {
			const { data } = await postHttp.post("/User/getUserInfo", {
				loginUserId: payload.loginUserId,
				logintoken: payload.logintoken,
			});
			if (!data.error) {
				context.commit('updateUserInfo', data.data)
			} else {
				alert(data.message);
			}
		}
	}
})

export default store