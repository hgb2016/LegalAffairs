<template>
  <div>
    <div class="ContactList-header">
      <div class="ContactList-weichat" @click="weiChatInvite">
        <img src="../../assets/img/icon_weichat.png" alt>
        <p>微信添加好友</p>
      </div>
      <div class="ContactList-header-search">
        <input @input="getNiuFaUser()" v-model="keyword" type="text" placeholder="请输入关键字">
        <i></i>
      </div>
    </div>
    <div class="ContactList-list">
      <div
        class="ContactList-list-item"
        v-for="(item,index) in contactlist"
        :key="index"
        @click="goContactInfo(item)"
      >
        <img :src="item.headUrl" alt>
        <p>{{item.userName}} &nbsp; {{item.mobilePhone}}</p>
      </div>
    </div>
    <share v-if="shareFlag" @ievent='closeShare'></share>
  </div>
</template>

<script>
import postHttp from "../../assets/js/postHttp.js";
import wx from "weixin-js-sdk";
import * as API from "../../assets/js/api.js";
import axios from "axios";
import share from 'base/share'
export default {
  components:{
    share
  },
  data() {
    return {
      loginUserId: "",
      logintoken: "",
      contactlist: [],
      keyword: "",
      shareFlag:false,
    };
  },
  created() {
    this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
    var title =API.sharetitle;
    this.getNiuFaUser();
    this.getJssdk(
      API.shareUrl,
      window.localStorage.getItem("loginHeadUrl"),
      title ,
      API.sharecontent
    );
  },
  methods: {
    closeShare () {
      this.shareFlag = false
    },
    weiChatInvite () {
      this.shareFlag = true
    },
    goContactInfo(item) {
      console.log(item);
      this.$router.push({ path: "/ContactInfo", query: { userinfo: item } });
    },
    async getNiuFaUser() {
      const { data } = await postHttp.post("/Index/getNiuFaUser", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken,
        keyword: this.keyword
      });
      if (!data.error) {
        this.contactlist = data.data;
      } else {
        alert(data.message);
      }
    },
    //获取微信签名
    async getJssdk(shareUrl, imgUrl, title, content) {
      var _this = this;
      axios.defaults.headers["Authorization"] =
        "NTEyZDAzYWVmZDFiNWE4ZTEzMzc1YWMwOGUxZjE0ZGU=";
      axios
        .post(
          "http://m.niuer.cn/ChatbotLaw/getWXSignPackage",
          { url: window.location.href },
          {
            "Content-Type": "application/json; charset=UTF-8"
          }
        )
        .then(function(response) {
          if (!response.data.error) {
            let dataSet = response.data.data;

            _this.wechar(
              dataSet.appId,
              dataSet.timestamp,
              dataSet.nonceStr,
              dataSet.signature,
              shareUrl,
              imgUrl,
              title,
              content
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //微信配置
    wechar(
      appId,
      timestamp,
      nonceStr,
      signature,
      shareUrl,
      imgUrl,
      title,
      content
    ) {
      let newShareUrl;
      if (localStorage.getItem("loginUserId")) {
        let userId = localStorage.getItem("loginUserId");
        newShareUrl = shareUrl + userId;
      } else {
        newShareUrl = shareUrl;
      }
      wx.config({
        debug: false,
        appId: appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
        jsApiList: [
          "onMenuShareAppMessage",
          "onMenuShareTimeline",
          "onMenuShareQQ",
          "onMenuShareQZone"
        ]
      });
      //处理验证失败的信息
      wx.error(function(res) {
        console.log("验证失败返回的信息:", res);
      });
      //处理验证成功的信息
      wx.ready(function() {
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          link: newShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: function(res) {
            // 用户确认分享后执行的回调函数
            // alert("分享到朋友圈成功返回的信息为:",res)
          },
          cancel: function(res) {
            // 用户取消分享后执行的回调函数
            // alert("取消分享到朋友圈返回的信息为:",res)
          }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: content, // 分享描述
          link: newShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          type: "", // 分享类型,music、video或link，不填默认为link
          dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          success: function(res) {
            // 用户确认分享后执行的回调函数
            // alert("分享到朋友圈成功返回的信息为:",res)
          },
          cancel: function(res) {
            // 用户取消分享后执行的回调函数
            // alert("取消分享给朋友返回的信息为：",res)
          }
        });
        //分享到QQ
        wx.onMenuShareQQ({
          title: title, // 分享标题
          desc: content, // 分享描述
          link: newShareUrl, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function(res) {
            // 用户确认分享后执行的回调函数
          },
          cancel: function(res) {
            // 用户取消分享后执行的回调函数
          }
        });
        //分享到QQ空间
        wx.onMenuShareQZone({
          title: title, // 分享标题
          desc: content, // 分享描述
          link: newShareUrl, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function(res) {
            // 用户确认分享后执行的回调函数
          },
          cancel: function(res) {
            // 用户取消分享后执行的回调函数
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.ContactList {
  width: 100%;
  &-weichat {
    width: 100%;
    .f-d-f;
    .f-fd-c;
    .f-ai-c;
    font-size: 14px;
    img {
      margin-top: 10px;
      margin-bottom: 10px;
      width: 40px;
    }
    p {
      margin-bottom: 10px;
    }
  }
  &-header {
    background: #fff;
    position: fixed;
    top: 60px;
    width: 100%;
    &-search {
      margin: 0px 20px 10px;
      .f-f-1;
      .f-d-f;
      height: 30px;
      border: 1px solid #e5e5e5;
      border-radius: 30px;
      background-color: #fff;
      .f-d-f;
      .f-jc-sb;
      .f-ai-c;
      padding: 0 10px;
      i {
        background-image: url("../../assets/img/icon_search.png");
        width: 26px;
        height: 26px;
        background-size: 100% 100%;
      }
      input {
        width: 100%;
        font-size: 12px;
        color: #333;
      }
    }
  }

  &-list {
    padding: 180px 0px 60px;
    width: 100%;
    &-item {
      .f-d-f;
      .f-fd-r;
      .f-ai-c;
      border-bottom: 1px solid #ededed;
      padding: 12px 20px;
      img {
        border-radius: 50%;
        height: 35px;
        width: 35px;
      }
      p {
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
}
</style>
