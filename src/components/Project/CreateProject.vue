<template>
  <div class="add-day">
    <div class="add-day-input">
      <input type="text" v-model="projectName" placeholder="请输入项目名称">
    </div>

    <div class="add-day-list">
      <ul>
        <!-- <li>
          <div class="w-l" >
            <span class="tit">项目状态</span>
            <div class="w-l-status">
              <p v-for="(item,index) in statusList" :key="index" @click="choiceLists(index)">
                <template v-if="index === idx">
                  <img :src="item.clickImg" alt>
                </template>
                <template v-else>
                  <img :src="item.img" alt>
                </template>
                {{item.name}}
              </p>
            </div>
          </div>
        </li>-->
        <li>
          <div class="w-d">
            <div class="w-d-part">
              <h3>参与人</h3>
              <div class="part-i">
                <ul v-if="choiceUserListsParents.length>0">
                  <li v-for="(item,index) in choiceUserListsParents" :key="index">
                    <delete-img :item="item" @closeDelete="closeDelete"></delete-img>
                  </li>
                </ul>
              </div>
            </div>
            <p>
              <img @click="goMyFriends" src="../../assets/img/contact_add.png" alt>
            </p>
          </div>
        </li>
        <li>
          <div class="w-l">
            <span class="tit">主要负责人</span>
            <p @click="showMajorUser=true">
              <span>{{majorUserName}}</span>
              <img class="arrow" src="../../assets/img/arrow.png" alt>
            </p>
          </div>
        </li>
        <li>
          <div class="w-l">
            <span class="tit">客户</span>
            <p @click="showSale=true">
              <span>{{clientTitle}}</span>
              <img class="arrow" src="../../assets/img/arrow.png" alt>
            </p>
          </div>
        </li>

        <li>
          <div class="w-l" v-show="false">
            <span class="tit">提醒</span>
            <p @click="showLis=!showLis">
              <span class="ccColor">地址、备注、附件</span>
              <img class="down" src="../../assets/img/down.png" alt>
            </p>
          </div>
        </li>
        <li v-if="showLis">
          <div class="w-l" style="padding:0 15px;">
            <span class="tit" style="color:#999">地址</span>
            <p>
              <input type="text" placeholder="请输入地址" v-model="address">
            </p>
          </div>
        </li>
        <li>
          <div class="w-l" style="padding:0 15px;">
            <span class="tit" style="color:#999">备注</span>
            <p>
              <input type="text" placeholder="请输入备注" v-model="Remarks">
            </p>
          </div>
        </li>
        <li v-if="showLis">
          <div class="w-l w-i" style="padding:0 15px;">
            <span class="tit" style="color:#999">上传附件</span>
            <p>
              <input type="file" accept="image/gif, image/jpeg, image/jpg, image/png">
              <img src="../../assets/img/icon_addpicture.png" alt>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <button class="bottom-btn" @click="submitProject">确定</button>
    <mt-datetime-picker
      v-model="pickerVisible"
      type="datetime"
      ref="picker"
      @confirm="closeTimePicker"
    ></mt-datetime-picker>
    <mt-datetime-picker
      v-model="pickerVisibleEnd"
      type="datetime"
      ref="pickerEnd"
      @confirm="closeTimePickerEnd"
    ></mt-datetime-picker>
    <error-remind
      v-if="showRemind"
      @Close_errorMind="showRemind = false"
      :errorRemind="errorRemind"
    ></error-remind>
    <add-client
      :showSale="showSale"
      @close_Sale="close_Sale"
      :clientLists="clientLists"
      :clientId="clientId"
    ></add-client>
    <add-majoruser
      :showMajorUser="showMajorUser"
      @close_Sale="close_majoruser"
      :userLists="contactlist"
      :userId="majorUserId"
    ></add-majoruser>
    <add-time :showTime="showTime" @close_Time="close_Time"></add-time>
    <add-friends
      :choiceUserListsParents="choiceUserListsParents"
      :showFriends="showFriends"
      @close_Friends="close_Friends"
      :contactlist="contactlist"
    ></add-friends>
  </div>
</template>

<script>
import icon_checkempty from "@/assets/img/icon_checkempty.png";
import check_green from "@/assets/img/check_green.png";
import ErrorRemind from "base/ErrorRemind.vue";
import AddClient from "base/AddClient.vue";
import AddMajoruser from "base/AddMajoruser.vue";
import AddFriends from "base/AddFriends.vue";
import AddTime from "base/AddTime.vue";
import DeleteImg from "base/DeleteImg";
import liyan from "@/assets/img/liyan.jpg";
import postHttp from "../../assets/js/postHttp.js";

export default {
  components: {
    ErrorRemind,
    AddFriends,
    AddMajoruser,
    AddClient,
    DeleteImg,
    AddTime
  },
  data() {
    return {
      statusList: [
        {
          name: "洽谈中",
          status: false,
          img: icon_checkempty,
          clickImg: check_green
        },
        {
          name: "进行中",
          status: false,
          img: icon_checkempty,
          clickImg: check_green
        },
        {
          name: "已完成",
          status: false,
          img: icon_checkempty,
          clickImg: check_green
        }
      ],
      idx: -1,
      showMajorUser: false,
      majorUserName: "", //主要负责人
      majorUserId: "",
      projectId: "",
      Remarks: "",
      projectName: "",
      address: "",
      showLis: false,
      pickerVisible: new Date(),
      startTime: this.defaultDate(),
      endTime: "",
      timeMark: "start",
      showRemind: false,
      errorRemind: "",
      pickerVisibleEnd: "",
      showSale: false,
      showFriends: false,
      showTime: false,
      choiceUserListsParents: [],
      contactlist: [],
      clientLists: [],
      clientTitle: "请选择客户",
      clientId: "",
      timeString: "准点提醒"
    };
  },
  computed: {
    TimeDiff() {
      return this.keepTwo(
        parseInt(this.pickerVisibleEnd - this.pickerVisible) / 1000 / 60 / 60
      );
    }
  },
  methods: {
    close_majoruser(data) {
      this.showMajorUser = false;
      if (data.name !== "") {
        this.majorUserName = data.name;
        this.majorUserId = data.id;
      }
    },
    close_Sale(data) {
      this.showSale = false;
      if (data.name !== "") {
        this.clientTitle = data.name;
        this.clientId = data.id;
      }
    },
    close_Friends(data) {
      this.choiceUserListsParents = data;
      this.showFriends = false;
    },
    close_Time(data) {
      this.timeString = data.substr(0, data.length - 1);
      this.showTime = false;
    },
    goMyFriends() {
      this.showFriends = true;
      // this.$router.push('/MyFriends')
    },
    keepTwo(num) {
      let result = parseFloat(num);
      if (isNaN(result)) {
        return false;
      }
      result = Math.round(num * 100) / 100;
      let s_x = result.toString();
      let pos_decimal = s_x.indexOf(".");
      if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += ".";
      }
      while (s_x.length <= pos_decimal + 2) {
        s_x += "0";
      }
      return s_x;
    },
    // 起始的默认时间
    defaultDate() {
      var y = new Date().getFullYear();
      var m =
        new Date().getMonth() + 1 <= 9
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      var d =
        new Date().getDate() <= 9
          ? "0" + new Date().getDate()
          : new Date().getDate();
      let hour =
        new Date().getHours() <= 9
          ? "0" + new Date().getHours()
          : new Date().getHours();
      let min =
        new Date().getMinutes() <= 9
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let sec =
        new Date().getSeconds() <= 9
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      return y + "-" + m + "-" + d + " " + hour + ":" + min;
    },
    getStart() {
      this.$refs.picker.open();
    },
    getEnd() {
      this.$refs.pickerEnd.open();
    },
    formatDatetime(time) {
      if (time === "" || time === null) {
        return;
      } else {
        let y = new Date(time).getFullYear();
        let m =
          new Date(time).getMonth() + 1 <= 9
            ? "0" + (new Date(time).getMonth() + 1)
            : new Date(time).getMonth() + 1;
        let d =
          new Date(time).getDate() <= 9
            ? "0" + new Date(time).getDate()
            : new Date(time).getDate();
        let hour =
          new Date(time).getHours() <= 9
            ? "0" + new Date(time).getHours()
            : new Date(time).getHours();
        let min =
          new Date(time).getMinutes() <= 9
            ? "0" + new Date(time).getMinutes()
            : new Date(time).getMinutes();
        let sec =
          new Date(time).getSeconds() <= 9
            ? "0" + new Date(time).getSeconds()
            : new Date(time).getSeconds();
        return y + "-" + m + "-" + d + " " + hour + ":" + min;
      }
    },
    formatEnd(time) {
      return (
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1 <= 9
          ? "0" + time.getMonth() + 1
          : time.getMonth() + 1) +
        "-" +
        (time.getDate() <= 9 ? "0" + time.getDate() : time.getDate()) +
        " " +
        (time.getHours() <= 9 ? "0" + time.getHours() : time.getHours()) +
        ":" +
        (time.getMinutes() <= 9 ? "0" + time.getMinutes() : time.getMinutes())
      );
    },
    closeTimePicker() {
      this.startTime = this.formatDatetime(this.pickerVisible);
      let dateAfter = new Date(
        new Date(this.pickerVisible).getTime() + 1 * 60 * 60 * 1000
      );
      this.endTime = this.formatEnd(dateAfter);
      this.pickerVisibleEnd = dateAfter;
    },
    closeTimePickerEnd() {
      if (this.pickerVisibleEnd < this.pickerVisible) {
        this.showRemind = true;
        this.errorRemind = "结束时间不能小于开始时间";
        setTimeout(() => {
          this.showRemind = false;
        }, 2000);
        this.$refs.pickerEnd.open();
      } else {
        this.endTime = this.formatDatetime(this.pickerVisibleEnd);
      }
    },
    choiceLists(index) {
      if (this.idx !== index) {
        this.idx = index;
      }
    },
    goTime() {
      this.showTime = true;
    },
    closeDelete() {},
    async getNiuFaUser() {
      const { data } = await postHttp.post("/Index/getNiuFaUser", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken")
      });
      if (!data.error) {
        data.data.forEach(v => {
          v.status = false;
        });
        this.contactlist = data.data;
      } else {
        alert(data.message);
      }
    },
    async getAllClientInfo() {
      const { data } = await postHttp.post("/Index/getAllClientInfo", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken")
      });
      console.log(data);
      if (!data.error) {
        // data.data.forEach(v=>{
        // 	v.status = false
        // })
        this.clientLists = data.data;
      } else {
        alert(data.message);
      }
    },
    async submitProject() {
      const { data } = await postHttp.post("/Project/editProject", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken"),
        projectId: this.projectId,
        projectName: this.projectName,
        description: this.Remarks,
        userId:this.majorUserId,
        clientId: this.clientId,
        userList: this.choiceUserListsParents
      });
      console.log(data);
      if (!data.error) {
        $router.go(-1)
      } else {
        alert(data.message);
      }
    }
  },
  created() {
    this.projectId = this.$route.query.projectId;
    let dateAfter = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);
    this.endTime = this.formatEnd(dateAfter);
    this.pickerVisibleEnd = dateAfter;
    this.getNiuFaUser();
    this.getAllClientInfo();
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.add-day {
  .f-d-f;
  .f-fd-c;
  &-input {
    width: 100%;
    .f-d-f;
    height: 80px;
    margin-top: 38px;
    input {
      .f-f-1;
      text-align: center;
      font-size: 16px;
      color: #333;
      font-weight: bold;
      background: #efeff4;
    }
  }
  &-twoTime {
    padding: 0 10px;
    width: 100%;
    .during {
      box-shadow: 3px 3px 3px #f3f3f3, 3px -3px 3px #f3f3f3,
        -3px 3px 3px #f3f3f3, -3px -3px 3px #f3f3f3;
      margin-top: 10px;
      padding: 14px 6px;
      .f-d-f;
      .f-jc-sb;
      &-start,
      &-end {
        .f-d-f;
        .f-fd-c;
        .f-ai-c;
        .f-jc-c;
        span {
          color: #999;
          font-size: 12px;
        }
        p {
          color: #000;
          font-size: 16px;
          margin: 4px 0;
        }
      }
      &-hour {
        .f-d-f;
        .f-ai-c;
        .f-jc-c;
        hr {
          width: 10px;
        }
        span {
          height: 20px;
          padding: 0 8px;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          color: #333;
          border: 1px solid #e5e5e5;
          border-radius: 10px;
        }
      }
    }
  }
  &-list {
    width: 100%;
    ul {
      width: 100%;
      .f-d-f;
      .f-fd-c;
      li {
        border-bottom: 1px solid #e5e5e5;
        .w-l {
          height: 60px;
          .f-d-f;
          .f-ai-c;
          padding: 0 10px;
          .f-d-f;
          .f-jc-sb;
          .tit {
            font-size: 14px;
            color: #333;
          }
          p {
            .f-d-f;
            .f-ai-c;
            img {
              width: 22px;
            }
            span {
              color: #666;
              font-size: 14px;
            }
            .arrow {
              width: 10px;
              margin-left: 10px;
            }
            .down {
              width: 18px;
              margin-left: 10px;
            }
            .ccColor {
              color: #999;
            }
            input {
              text-align: right;
            }
          }
          &-status {
            .f-d-f;
            .f-fd-r;
            p {
              margin-left: 8px;
              font-size: 14px;
              img {
                margin-right: 4px;
                width: 16px;
              }
            }
          }
        }
        .w-d {
          .f-d-f;
          .f-ai-c;
          .f-jc-sb;
          padding: 0 10px;
          min-height: 60px;
          .w-d-part {
            .f-f-1;
            .f-d-f;
            .f-ai-c;
            h3 {
              color: #333;
              font-size: 14px;
            }
            .part-i {
              .f-f-1;
              padding: 10px 0;
              ul {
                .f-fd-r;
                .f-fw-w;
                .f-d-f;
                width: 100%;
                li {
                  border: none;
                }
              }
            }
          }
          p {
            img {
              width: 22px;
            }
          }
        }
        .w-i {
          p {
            position: relative;
            width: 40px;
            height: 40px;
            img {
              width: 100%;
              height: 100%;
            }
            input {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              opacity: 0;
            }
          }
        }
      }
    }
  }
}
.bottom-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  color: white;
  height: 40px;
  background-color: #2b6fce;
}
</style>
