import axios from 'axios';
import qs from 'qs';
import * as API from "./api";

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus(response) {
  //loading
  // 如果http状态码正常，则正常返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {

    return response
  }
  return {
    status: -404,
    msg: '网络异常'
  }
}
// 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
function checkCode(res) {
  // console.log(res)
  if (res.status === -404) {
    // vuex.state.staticImage = 'error';
    // vuex.state.isUploadState = false;
  }
  if (res.data && (!res.data.success)) {

  }
  // if (res.data.code === 100403) {
  //  router.push('/')
  // }
  return res;
}

export default {
  get(url, data) {
    return axios({
      method: 'get',
      baseURL: API.baseUrl,
      url,
      params: JSON.stringify(data),
      headers: {
        'Content-Type':'application/json; charset=UTF-8',
        'token': data.token
      },
      onUploadProgress(progressEvent) {
        //  = progressEvent.loaded / progressEvent.total
        // console.log(progressEvent.loaded / progressEvent.total)
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}