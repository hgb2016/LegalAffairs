<template>
  <div class="add-day">
    <div class="add-day-input">
      <input type="text" placeholder="请输入日程名称" v-model="title">
    </div>
    <div class="add-day-twoTime">
      <div class="during">
        <div class="during-start" @click="getStart">
          <span>开始</span>
          <p>{{startTime.split(' ')[1]}}</p>
          <span>{{startTime.split(' ')[0]}}</span>
        </div>
        <div class="during-hour">
          <hr>
          <span>{{TimeDiff}}小时</span>
          <hr>
        </div>
        <div class="during-end" @click="getEnd">
          <span>结束</span>
          <p>{{endTime.split(' ')[1]}}</p>
          <span>{{endTime.split(' ')[0]}}</span>
        </div>
      </div>
    </div>
    <div class="add-day-list">
      <ul>
        <!-- <li>
					<div class="w-l">
						<span class="tit">此事项为：</span>
						<div>
							<p v-for="(item,index) in peopleList" :key="index" @click="choiceLists(index)">
								<template v-if="index === idx">
									<img :src="item.clickImg" alt="">
								</template>
								<template v-else>
									<img :src="item.img" alt="">
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
                    <delete-img :item="item" @closeDelete="closeDelete" :details="'true'"></delete-img>
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
            <span class="tit">项目</span>
            <p @click="showSale=true">
              <span>{{projectTitle}}</span>
              <img class="arrow" src="../../assets/img/arrow.png" alt>
            </p>
          </div>
        </li>
        <li>
          <div class="w-l">
            <span class="tit">提醒</span>
            <p @click="goTime">
              <span>{{timeString.join(',')}}</span>
              <img class="arrow" src="../../assets/img/arrow.png" alt>
            </p>
          </div>
        </li>
        <li>
          <div class="w-l">
            <span class="tit">更多</span>
            <p @click="showLis=!showLis">
              <span class="ccColor">地址、备注</span>
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
        <li v-if="showLis">
          <div class="w-l" style="padding:0 15px;">
            <span class="tit" style="color:#999">备注</span>
            <p>
              <input type="text" placeholder="请输入备注" v-model="Remarks">
            </p>
          </div>
        </li>
        <!-- <li v-if="showLis">
					<div class="w-l w-i" style="padding:0 15px;">
						<span class="tit" style="color:#999">上传附件</span>
						<p>
							<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png">
							<img src="../../assets/img/icon_addpicture.png" alt="">
						</p>
					</div>
        </li>-->
      </ul>
    </div>
    <div class="add-day-btn">
      <button @click="Preservation">确定</button>
    </div>
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
    <add-project
      :showSale="showSale"
      @close_Sale="close_Sale"
      :projectLists="projectLists"
      :projectUid="projectUid"
    ></add-project>
    <add-time :showTime="showTime" @close_Time="close_Time" :timeString="timeString"></add-time>
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
import AddProject from "base/AddProject.vue";
import AddFriends from "base/AddFriends.vue";
import AddTime from "base/AddTime.vue";
import DeleteImg from "base/DeleteImg";
import liyan from "@/assets/img/liyan.jpg";
import postHttp from "../../assets/js/postHttp.js";

export default {
  components: {
    ErrorRemind,
    AddFriends,
    AddProject,
    DeleteImg,
    AddTime
  },
  data() {
    return {
      peopleList: [
        {
          name: "工作",
          status: false,
          img: icon_checkempty,
          clickImg: check_green
        },
        {
          name: "私人",
          status: false,
          img: icon_checkempty,
          clickImg: check_green
        }
      ],
      idx: -1,
      Remarks: "",
      address: "",
      showLis: false,
      pickerVisible: "",
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
      projectLists: [],
      projectTitle: "请选择项目",
      projectUid: "",
      timeString: ["准点提醒"],
      title: "",
      editDays: false
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
    // 添加日程
    async Preservation() {
      if (this.$route.query.scheduleId) {
        if (this.title === "") {
          this.showRemind = true;
          this.errorRemind = "请输入客户名称";
          setTimeout(() => {
            this.showRemind = false;
            this.errorRemind = "";
          }, 2000);
        } else {
          let newObj = {};
          (newObj["loginUserId"] = localStorage.getItem("loginUserId")),
            (newObj["logintoken"] = window.localStorage.getItem("logintoken"));
          newObj["title"] = this.title;
          newObj["beginTime"] = this.startTime;
          newObj["endTime"] = this.endTime;
          newObj["scheduleId"] = this.$route.query.scheduleId;
          if (this.address !== "") {
            newObj["address"] = this.address;
          }
          if (this.Remarks !== "") {
            newObj["remark"] = this.Remarks;
          }
          if (this.projectUid !== "") {
            newObj["projectId"] = this.projectUid;
          }
          let timeArr = [];
          this.timeString.forEach(a => {
            let newtime = {};
            newtime["description"] = a;
            timeArr.push(newtime);
          });
          newObj["remindList"] = timeArr;
          const { data } = await postHttp.post(
            "/Calendar/editCalendar",
            newObj
          );
          console.log(data);
          if (!data.error) {
            this.showRemind = true;
            this.errorRemind = "修改成功";
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          } else {
            alert(data.message);
          }
        }
      } else {
        if (this.title === "") {
          this.showRemind = true;
          this.errorRemind = "请输入客户名称";
          setTimeout(() => {
            this.showRemind = false;
            this.errorRemind = "";
          }, 2000);
        } else {
          let newObj = {};
          (newObj["loginUserId"] = localStorage.getItem("loginUserId")),
            (newObj["logintoken"] = window.localStorage.getItem("logintoken"));
          newObj["title"] = this.title;
          newObj["beginTime"] = this.startTime;
          newObj["endTime"] = this.endTime;
          if (this.address !== "") {
            newObj["address"] = this.address;
          }
          if (this.Remarks !== "") {
            newObj["remark"] = this.Remarks;
          }
          if (this.projectUid !== "") {
            newObj["projectId"] = this.projectUid;
          }
          let timeArr = [];
          this.timeString.forEach(a => {
            let newtime = {};
            newtime["description"] = a;
            timeArr.push(newtime);
          });
          newObj["remindList"] = timeArr;
          if (this.choiceUserListsParents.length > 0) {
            let newArr = [];
            this.choiceUserListsParents.forEach(v => {
              let newObj = {};
              newObj["userId"] = v.id;
              newArr.push(newObj);
            });
            newObj["userList"] = newArr;
          }
          const { data } = await postHttp.post(
            "/Calendar/editCalendar",
            newObj
          );
          console.log(data);
          if (!data.error) {
            this.showRemind = true;
            this.errorRemind = "添加成功";
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          } else {
            alert(data.message);
          }
        }
      }
    },
    close_Sale(data) {
      this.showSale = false;
      if (data.name !== "") {
        this.projectTitle = data.name;
        this.projectUid = data.id;
      }
    },
    close_Friends(data) {
      this.choiceUserListsParents = data;
      this.showFriends = false;
      console.log(data);
      if (this.editDays === true) {
        this.editCalendarPar();
      }
    },
    async editCalendarPar() {
      let newObj = {};
      newObj["loginUserId"] = window.localStorage.getItem("loginUserId");
      newObj["logintoken"] = window.localStorage.getItem("logintoken");
      if (this.choiceUserListsParents.length > 0) {
        let newArr = [];
        this.choiceUserListsParents.forEach(v => {
          let newObj = {};
          newObj["userId"] = v.id;
          newArr.push(newObj);
        });
        newObj["userList"] = newArr;
      } else {
        newObj["userList"] = [];
      }
      newObj["scheduleId"] = this.$route.query.scheduleId;
      const { data } = await postHttp.post("/Calendar/editCalendarPar", newObj);
      console.log(data);
    },
    close_Time(data) {
      this.timeString = data;
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
      let y = time.getFullYear();
      let m =
        time.getMonth() + 1 <= 9
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      console.log(m);
      let d = time.getDate() <= 9 ? "0" + time.getDate() : time.getDate();
      let hour = time.getHours() <= 9 ? "0" + time.getHours() : time.getHours();
      let min =
        time.getMinutes() <= 9 ? "0" + time.getMinutes() : time.getMinutes();
      let sec =
        time.getSeconds() <= 9 ? "0" + time.getSeconds() : time.getSeconds();
      return y + "-" + m + "-" + d + " " + hour + ":" + min;
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
    async getProjectList() {
      const { data } = await postHttp.post("/Project/getProjectList", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken")
      });
      if (!data.error) {
        data.data.forEach(v => {
          v.status = false;
        });
        this.projectLists = data.data;
          if (this.$route.query.projectId) {
        this.projectUid = this.$route.query.projectId;
          this.projectLists.forEach(element => {   
           if(this.projectUid==element.projectId){
              this.projectTitle=element.projectName
            
           }
        });
      }
      } else {
        alert(data.message);
      }
    },
    // 获取项目详情
    async getCalendarInfo(id) {
      const { data } = await postHttp.post("/Calendar/getCalendarInfo", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken"),
        scheduleId: id
      });
      if (!data.error) {
        let dayDetails = data.data;
        this.title = dayDetails.title;
        this.startTime = dayDetails.beginTime;
        this.pickerVisible = new Date(dayDetails.beginTime);
        this.pickerVisibleEnd = dayDetails.endTime;
        this.timeString = [];
        dayDetails.remindList.forEach(a => {
          this.timeString.push(a.value);
        });
        if (dayDetails.projectName) {
          this.projectTitle = dayDetails.projectName;
          this.projectUid = dayDetails.projectId;
        }
        this.endTime = dayDetails.endTime;
        this.address = dayDetails.address;
        this.Remarks = dayDetails.remark;
        this.choiceUserListsParents = [];
        dayDetails.userList.forEach((v, index) => {
          if (index > 0) {
            let newUsers = {};
            newUsers["id"] = v.userId;
            newUsers["img"] = v.headUrl;
            newUsers["name"] = v.userName;
            this.choiceUserListsParents.push(newUsers);
          }
        });
      } else {
        alert(data.message);
      }
    },
    clickDateDefault(time) {
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
    }
  },
  created() {
    this.getNiuFaUser();
    this.getProjectList();
    if (this.$route.query.scheduleId) {
      this.editDays = true;
      this.getCalendarInfo(this.$route.query.scheduleId);
    } else {
    
      if (this.$route.query.clickDate) {
        this.startTime = this.clickDateDefault(this.$route.query.clickDate);
        this.pickerVisible = new Date(this.$route.query.clickDate);
        this.editDays = false;
        let dateAfter = new Date(
          new Date(this.$route.query.clickDate).getTime() + 1 * 60 * 60 * 1000
        );
        this.endTime = this.clickDateDefault(dateAfter);
        this.pickerVisibleEnd = dateAfter;
      } else {
        this.startTime = this.defaultDate();
        this.pickerVisible = new Date();
        this.editDays = false;
        let dateAfter = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);
        this.endTime = this.formatEnd(dateAfter);
        this.pickerVisibleEnd = dateAfter;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.add-day {
  .f-d-f;
  .f-fd-c;
  padding-bottom: 50px;
  &-input {
    width: 100%;
    .f-d-f;
    height: 80px;
    margin-top: 38px;
    input {
      .f-f-1;
      text-align: center;
      background-color: #efeff4;
      font-size: 16px;
      color: #000;
    }
    ::-webkit-input-placeholder {
      color: #000;
    }
  }
  &-btn {
    padding: 0 20px;
    position: fixed;
    bottom: 10px;
    width: 100vw;
    button {
      width: 100%;
      height: 100%;
      background-color: #2d75ee;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      color: #fff;
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
</style>
