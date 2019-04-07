<template>
  <div class="Project">
    <!-- 案件列表-->
    <div class="Project-list">
      <div class="Project-list-item">
        <div class="Project-list-item-r">
          <p>{{projectInfo.projectName}}</p>
          <span>
            <p>洽谈中</p>
            <i></i>
          </span>
        </div>
        <p v-show="projectInfo.description" class="Project-list-desc">描述：{{projectInfo.description}}</p>
        <div class="Project-list-client" v-show="projectInfo.clientName">
          <span>
            <img src="../../assets/img/icon_client.png" alt>
            <p>{{projectInfo.clientName}}</p>
          </span>
          <img width="8px" src="../../assets/img/arrow.png" alt>
        </div>
        <div>
          <div class="Project-list-parters">
            <img src="../../assets/img/icon__players.png" alt>
           
              <span v-for="(item,index) in projectInfo.userList" :key="index">
                <img :src="item.headUrl" alt>
                <p>{{item.userName}}</p>
              </span>
            
          </div>
        </div>
        <div class="Project-list-client">
          <span>
            <p>项目日程</p>
          </span>
          <img width="30px" src="../../assets/img/banbenjieshao (1).png" alt>
        </div>
      </div>
    </div>
    <calendar-list :calendarList="projectInfo.timeDataList"></calendar-list>
  </div>
</template>

<script>
import calendarList from "base/CalendarList";
import postHttp from "../../assets/js/postHttp.js";

export default {
  components: {
    calendarList
  },
  data() {
    return {
      projectId: "",
      projectInfo: []
    };
  },
  created() {
    this.projectId = this.$route.query.id;
    this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
    this.getProjectDetail();
  },
  methods: {
    async getProjectDetail() {
      const { data } = await postHttp.post("/Project/getProjectInfo", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken,
        projectId: this.projectId
      });
      if (!data.error) {
        this.projectInfo = data.data;
      } else {
        alert(data.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.Project {
  width: 100%;
  &-header {
    background: #fff;
    position: fixed;
    top: 0px;
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
    margin-top: 50px;
    width: 100%;
    &-parters {
      .f-d-f;
      .f-fd-r;
      .f-ai-c;
      padding: 15px 20px;
      flex-wrap: wrap;
      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
      span {
        margin-left: 5px;
        .f-d-f;
        .f-fd-c;
        .f-ai-c;
        justify-content: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 0px;
        }
        p {
          text-align: center;
          margin-top: 5px;
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 60px;
        }
      }
    }
    &-desc {
      padding: 10px 20px;
      color: #ccc;
      font-size: 12px;
    }
    &-client {
      .f-d-f;
      .f-fd-r;
      .f-jc-sb;
      .f-ai-c;
      border-bottom: #ededed solid 1px;
      border-top: #ededed solid 1px;
      img {
        margin-right: 20px;
      }
      span {
        padding: 5px 20px;
        .f-d-f;
        .f-fd-r;
        .f-ai-c;
        font-size: 14px;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    &-item {
      &-r {
        border-bottom: 1px solid #ededed;
        font-size: 14px;
        padding: 8px 20px;
        .f-d-f;
        .f-fd-r;
        .f-jc-sb;
        .f-ai-c;
        span {
          .f-d-f;
          .f-fd-r;
          .f-ai-c;
          font-size: 12px;
          p {
            color: #fff;
            border-radius: 4px;
            background-color: #4fc15f;
            padding: 3px 20px;
          }
          i {
            margin-left: 10px;
            background-image: url("../../assets/img/up_black.png");
            width: 13px;
            height: 7.5px;
            background-size: 100% 100%;
          }
        }
      }
    }
    &-childItem {
      .f-d-f;
      .f-fd-c;
      font-size: 14px;
      padding: 10px 20px 10px 30px;
      div {
        .f-d-f;
        .f-fd-r;
        .f-ai-c;
        img {
          border-radius: 50%;
          height: 20px;
          width: 20px;
        }
        p {
          margin-top: 0px;
          color: #333;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      h5 {
        font-weight: bold;
        margin-top: 5px;
        margin-left: 30px;
      }
      p {
        color: #0c7dff;
        margin-top: 5px;
        font-size: 12px;
        margin-left: 30px;
      }
      span {
        margin-top: 10px;
        height: 0.5px;
        background-color: #ededed;
        margin-left: 30px;
      }
    }
  }
}
</style>
