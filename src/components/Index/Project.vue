<template>
  <div class="Project">
    <div class="Project-header">
      <div class="Project-header-search">
        <input @input="handelSearch()" v-model="keyword" type="text" placeholder="请输入项目名称">
        <i></i>
      </div>
      <div class="Project-sort">
        <div class="Project-sort-item" @click="issort=!issort">
          <span>
            <p>{{sort_name}}</p>
            <i :class="issort? 'up':'down'"></i>
          </span>
        </div>
        <div class="Project-sort-item" @click="isstatus=!isstatus">
          <span>
            <p>{{casestatus_show}}</p>
            <i :class="isstatus? 'up':'down'"></i>
          </span>
        </div>
      </div>
    </div>

    <ul class="Project-sort-select" v-if="issort">
      <li
        @click="handleSelect(item)"
        v-for="(item, index) in navLists"
        :key="index"
        :class="item.selected?'select':'unselect'"
      >{{item.name}}</li>
    </ul>
    <ul class="Project-sort-rightselect" v-if="isstatus">
      <li
        @click="handlestatus(item)"
        v-for="(item, index) in statusList"
        :key="index"
        :class="item.selected?'select':'unselect'"
      >{{item.name}}</li>
    </ul>
    <!-- 案件列表-->
    <div class="Project-list">
      <div class="Project-list-item" v-for="(item, index) in projectList " :key="index">
        <div class="Project-list-item-r">
          <p style="width:70%" @click="goProjectDetail(item.projectId)">{{item.projectName}}</p>
          <span @click="item.isUp=!item.isUp">
            <p v-show="item.status=='0'">进行中</p>
            <p v-show="item.status=='1'">洽谈中</p>
            <p v-show="item.status=='2'" style=" background-color: #999999;
  color: white;">已完成</p>
            <i :class="item.isUp? 'up':'down'"></i>
          </span>
        </div>
        <div
          v-show="item.isUp"
          class="Project-list-childItem"
          v-for="(childItem, index) in item.calenderList"
          :key="index"
        >
          <div>
            <img :src="childItem.headUrl" alt>
            <span></span>
          </div>
          <div>
            <p>{{childItem.createUserName }}&nbsp;&nbsp; {{childItem.beginTime}} - {{childItem.endTime}}</p>
            <h5>{{childItem.title}}</h5>
            <p style="color:#0c7dff">{{childItem.hourNum}}小时</p>
          </div>
        </div>
        <div
          @click="goProjectDetail(item.projectId)"
          v-show="item.isUp && item.calenderList.length==3"
          class="Project-list-more"
        >
          <p>更多>></p>
        </div>
      </div>
      <h6>{{lowupdate}}</h6>
    </div>
    <div class="Project-add" @click="$router.push('/CreateProject')">
      <img src="../../assets/img/icon_add.png" alt>
    </div>
  </div>
</template>

<script>
import postHttp from "../../assets/js/postHttp.js";
export default {
  data() {
    return {
      projectList: [],
      keyword: "",
      casestatus: "",
      casestatus_show: "所有",
      cur_page: 1,
      caseOrder: "",
      markCustomer: 1,
      totalPages: 0,
      lowupdate: "",
      issort: false,
      isstatus: false,
      sort_name: "默认",
      navLists: [
        {
          name: "默认",
          order: "",
          selected: true
        },
        {
          name: "名称",
          order: "projectName",
          selected: false
        },
        {
          name: "客户",
          order: "clientName",
          selected: false
        },
        {
          name: "时间",
          order: "jinzhanListShow",
          selected: false
        }
      ],
      statusList: [
        {
          name: "所有",
          order: "",
          selected: true
        },
        {
          name: "进行中",
          status: "0",
          selected: false
        },
        {
          name: "洽谈中",
          status: "1",
          selected: false
        },
        {
          name: "已完成",
          status: "2",
          selected: false
        }
      ]
    };
  },

  created() {
    this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
    this.getProjectList();
  },
  computed: {},
  methods: {
    handleSelect(item) {
      item.selected = true;
      this.sort_name = item.name;
      this.issort = false;
      if (item.name == "默认") {
        this.caseOrder = item.order;
      } else {
        this.caseOrder = item.order + " desc";
      }

      this.navLists.forEach(element => {
        if (element.name !== item.name) {
          element.selected = false;
        }
      });
      this.getProjectList();
    },
    handelSearch() {
      this.cur_page = 1;
      (this.casestatus = ""), (this.caseOrder = ""), this.getProjectList();
    },
    handlestatus(item) {
      item.selected = true;
      this.casestatus_show = item.name;
      this.isstatus = false;
      this.casestatus = item.status;
      this.statusList.forEach(element => {
        if (element.name !== item.name) {
          element.selected = false;
        }
      });
      this.getProjectList();
    },
    goProjectDetail(id) {
      this.$router.push(`/ProjectDetail?id=${id}`);
    },
    async getProjectList() {
      const { data } = await postHttp.post("/Project/getProjectList", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken,
        keyword: this.keyword,
        casestatus: this.casestatus,
        order: this.caseOrder,
        page: this.cur_page
      });
      if (!data.error) {
        this.markCustomer = 0;
        (this.projectList = []), (this.totalPages = data.totalPages);
        data.data.map(item => {
          this.projectList.push(item);
        });
        if (data.totalPages > 1) {
          this.lowupdate = "加载更多";
        } else {
          this.lowupdate = "";
        }
        this.projectList.forEach(element => {
          this.$set(element, "isUp", false);
        });
      } else {
        alert(data.message);
      }
    },
    async customerScroll() {
      let windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      let scrollY =
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageYOffset;
      if (
        scrollY + windowHeight === this.$el.getBoundingClientRect().height &&
        this.markCustomer === 0
      ) {
        this.markCustomer = 1;
        this.cur_page++;
        if (this.cur_page <= this.totalPages) {
          const { data } = await postHttp.post("/Project/getProjectList", {
            loginUserId: window.localStorage.getItem("loginUserId"),
            logintoken: window.localStorage.getItem("logintoken"),
            page: this.cur_page,
            keyword: this.keyword,
            casestatus: this.casestatus,
            order: this.caseOrder
          });
          console.log(data);
          if (!data.error) {
            this.markCustomer = 0;
            data.data.map(item => {
              this.projectList.push(item);
            });
            this.projectList.forEach(element => {
              this.$set(element, "isUp", false);
            });
            if (this.cur_page < data.totalPages) {
              this.lowupdate = "加载更多";
            } else {
              this.lowupdate = "";
            }
          }
          this.lowupdate = "加载更多";
        } else {
          this.lowupdate = "";
        }
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.customerScroll);
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.customerScroll);
    next();
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

  &-sort {
    font-size: 14px;
    padding: 1px 20px 5px;
    border-bottom: 1px solid #ededed;
    border-top: 1px solid #ededed;
    .f-d-f;
    .f-fd-r;
    .f-jc-sb;
    .f-ai-c;
    &-item {
      width: 50%;
      img {
        width: 12px;
        height: 7px;
      }
      span {
        border-right: 1px solid #ededed;
        .f-d-f;
        .f-fd-r;
        .f-ai-c;
        justify-content: center;
        p {
          margin-right: 5px;
        }
      }
    }
    &-select {
      width: 50%;
      box-shadow: 3px 3px 3px hsl(0, 8%, 95%), 3px -3px 3px #f3f3f3,
        -3px 3px 3px #f3f3f3, -3px -3px 3px #f3f3f3;
      background-color: white;
      position: absolute;
      top: 130px;
      li {
        padding: 5px 10px;
        font-size: 14px;
        text-align: center;
      }
    }
    &-rightselect {
      width: 50%;
      box-shadow: 3px 3px 3px hsl(0, 8%, 95%), 3px -3px 3px #f3f3f3,
        -3px 3px 3px #f3f3f3, -3px -3px 3px #f3f3f3;
      background-color: white;
      position: absolute;
      top: 130px;
      right: 0px;
      li {
        padding: 5px 10px;
        font-size: 14px;
        text-align: center;
      }
    }
  }
  &-list {
    padding-top: 130px;
    padding-bottom: 60px;
    width: 100%;
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
            padding: 3px 10px;
          }
        }
      }
    }
    &-childItem {
      font-size: 14px;
      padding: 10px 20px 0px 30px;
      .f-d-f;
      .f-fd-r;
      img {
        border-radius: 50%;
        height: 20px;
        width: 20px;
      }

      div {
        .f-d-f;
        .f-fd-c;
        span {
          margin-top: 5px;
          margin-left: 10px;
          background: #ededed;
          width: 1px;
          height: 100%;
        }
        h5 {
          font-weight: bold;
          margin-top: 5px;
          margin-left: 10px;
          margin-bottom: 5px;
        }
        p {
          margin-top: 0px;
          color: #333;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      div + div {
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px solid #ededed;
      }
     
    }
     &-more {
        margin-left: 50px;
        margin-right: 20px;
        p {
          padding-top: 5px;
          padding-bottom: 20px;
          width: 100%;
          text-align: right;
          color: #0c7dff;
          font-size: 13px;
        }
      }
    // &-childItem {
    //   .f-d-f;
    //   .f-fd-c;
    //   font-size: 14px;
    //   padding: 10px 20px 10px 30px;
    //   div {
    //     .f-d-f;
    //     .f-fd-r;
    //     .f-ai-c;
    //     img {
    //       border-radius: 50%;
    //       height: 20px;
    //       width: 20px;
    //     }
    //     p {
    //       margin-top: 0px;
    //       color: #333;
    //       font-size: 12px;
    //       margin-left: 10px;
    //     }
    //   }
    //   h5 {
    //     font-weight: bold;
    //     margin-top: 5px;
    //     margin-left: 30px;
    //   }
    //   p {
    //     color: #0c7dff;
    //     margin-top: 5px;
    //     font-size: 12px;
    //     margin-left: 30px;
    //   }
    //   span {
    //     margin-top: 10px;
    //     height: 0.5px;
    //     background-color: #ededed;
    //     margin-left: 30px;
    //   }
    // }
  }
  &-add {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 28px;
    height: 28px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.up {
  margin-left: 10px;
  background-image: url("../../assets/img/up_black.png");
  width: 13px;
  height: 7.5px;
  background-size: 100% 100%;
}
.down {
  margin-left: 10px;
  background-image: url("../../assets/img/down_black.png");
  width: 13px;
  height: 7.5px;
  background-size: 100% 100%;
}
.select {
  color: #0c7dff;
}
.unselect {
  color: #333;
}
.ungray {
  background-color: #999999;
  color: white;
}
h6 {
  width: 100%;
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  color: #333;
}
</style>
