<template>
  <div class="Project">
    <!-- 案件列表-->
    <div class="Project-list">
      <div class="Project-list-item">
        <div class="Project-list-item-r">
          <p>{{projectInfo.projectName}}</p>
          <span>
            <p v-show="projectInfo.status=='0'">进行中</p>
            <p v-show="projectInfo.status=='1'">洽谈中</p>
            <p v-show="projectInfo.status=='2'">已完成</p>
          </span>
        </div>
        <p v-show="projectInfo.description" class="Project-list-desc">描述：{{projectInfo.description}}</p>
        <div class="Project-list-client" v-show="projectInfo.clientName" @click="goClientDetail(projectInfo.clientId)">
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
    <div>
       <calendar-list v-if="projectInfo.timeDataList.length>0" :calendarList="projectInfo.timeDataList"></calendar-list>
       <img  v-if="projectInfo.timeDataList.length==0" src="../../assets/img/1.png" @click="goAddDay()"  style="margin-top:10px;" width="100%" alt="">
    </div>
   
  
    <div class="Project-btn">
      <button @click="deleteProject()">删除</button>
      <button @click="editProject()">修改</button>
    </div>
      <div class="Project-add" @click="goAddDay()">
      <img src="../../assets/img/icon_add.png" alt>
    </div>
  </div>
</template>

<script>
import calendarList from "base/CalendarList";
import postHttp from "../../assets/js/postHttp.js";
import ErrorRemind from "base/ErrorRemind.vue";
export default {
  components: {
    calendarList,
    ErrorRemind
  },
  data() {
    return {
      projectId: "",
      projectInfo: {}
    };
  },
  created() {
    this.projectId = this.$route.query.id;
    this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
    this.getProjectDetail();
  },
  methods: {
    goAddDay(){
         this.$router.push({path:'/AddDay',query:{projectId:this.projectId,projectName:this.projectInfo.projectName}})
    },
    goClientDetail(clientId){
         this.$router.push(`/CustomerDetails?CustomerDetails=${clientId}`)
    },
    //获取案件案情
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
    },
     // 删除案件
  async deleteProject() {
    const { data } = await postHttp.post("/Project/deleteProject", {
      loginUserId: window.localStorage.getItem("loginUserId"),
      logintoken: window.localStorage.getItem("logintoken"),
      projectId: this.projectId
    });
    if (!data.error) {
      // this.dayInfo = data.data;
      this.errorRemind = "删除成功";
      this.showRemind = true;
      setTimeout(() => {
        this.$router.go(-1);
      }, 2000);
    } else {
      alert(data.message);
    }
  },
  // 修改日程
  editProject() {
    this.$router.push(`/CreateProject?projectId=${this.projectId}`);
  }
  },
 
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.Project {
  width: 100%;
  &-btn {
    padding: 0 20px;
    margin-top: 20px;
    position: fixed;
    bottom: 10px;
    width: 100vw;
    .f-d-f;
    .f-jc-sb;
    button {
      width: 40%;
      height: 100%;
      background-color: #ccc;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      color: #fff;
    }
    button + button {
      background-color: #2d75ee;
    }
  }
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
   &-add {
    position: fixed;
    bottom: 100px;
    right: 40px;
    width: 28px;
    height: 28px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
