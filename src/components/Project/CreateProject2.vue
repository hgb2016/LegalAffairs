<template>
  <div class="create-project">
		<div class="create-project-input">
			<input type="text"  placeholder="请输入项目名称" v-model="title">
		</div>	
		<div class="create-project-list">
			<ul>
				<li>
					<div class="w-d">
						<div class="w-d-part">
							<h3>参与人</h3>
							<div class="part-i" >
								<ul v-if="choiceUserListsParents.length>0">
									<li v-for="(item,index) in choiceUserListsParents" :key="index">
										<delete-img :item="item" @closeDelete="closeDelete" :details="'true'"></delete-img>
									</li>
								</ul>
							</div>
						</div>
						<p>
							<img @click="goMyFriends" src="../../assets/img/contact_add.png" alt="">
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
						<p @click="showClient=true">
							<span>{{clientTitle}}</span>
							<img class="arrow" src="../../assets/img/arrow.png" alt="">
						</p>
					</div>
				</li>

				<li>  
					<div class="w-l">
						<span class="tit">更多</span>
						<p @click="showLis=!showLis">
							<span class="ccColor">地址、备注</span>
							<img class="down" src="../../assets/img/down.png" alt="">
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
				</li> -->
			</ul>
		</div>
		<div class="create-project-btn">
			<button @click="Preservation">
				确定
			</button>
		</div>
		<mt-datetime-picker
			v-model="pickerVisible"
			type="datetime"
			ref="picker"
			@confirm="closeTimePicker">
		</mt-datetime-picker>
		<mt-datetime-picker
			v-model="pickerVisibleEnd"
			type="datetime"
			ref="pickerEnd"
			@confirm="closeTimePickerEnd">
		</mt-datetime-picker>
     <add-client
      :showClient="showClient"
      @close_Sale="close_Clients"
      :clientLists="clientLists"
      :clientId="clientId"
    ></add-client>
    <add-majoruser
      :showMajorUser="showMajorUser"
      @close_Sale="close_majoruser"
      :userLists="contactlist"
      :userId="majorUserId"
    ></add-majoruser>
		<error-remind  v-if="showRemind" @Close_errorMind="showRemind = false" :errorRemind="errorRemind"></error-remind>
		<add-time :showTime="showTime" @close_Time="close_Time" :timeString="timeString"></add-time>
		<add-friends :choiceUserListsParents="choiceUserListsParents" :showFriends="showFriends" @close_Friends="close_Friends" :contactlist="contactlist"></add-friends>
	</div>
</template>

<script>
import icon_checkempty from "@/assets/img/icon_checkempty.png";
import check_green from "@/assets/img/check_green.png";
import ErrorRemind from "base/ErrorRemind.vue";

import AddFriends from "base/AddFriends.vue";
import AddClient from "base/AddClient.vue";
import AddMajoruser from "base/AddMajoruser.vue";
import AddTime from "base/AddTime.vue";
import DeleteImg from "base/DeleteImg";
import postHttp from "../../assets/js/postHttp.js";

export default {
  components: {
    ErrorRemind,
    AddFriends,
    AddClient,
    AddMajoruser,
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
      showMajorUser: false,
      majorUserName: "请选择主要负责人", //主要负责人
      majorUserId: "",
      clientLists: [],
      clientTitle: "请选择客户",
      clientId: "",
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
      showClient: false,
      showFriends: false,
      showTime: false,
      choiceUserListsParents: [],
      contactlist: [],
      projectLists: [],
      projectTitle: "请选择项目",
      projectUid: "",
      timeString: ["准点提醒"],
			title: "",
			editDays:false
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
    // 创建日程
    async Preservation() {
      if (this.$route.query.projectId) {
        if (this.title === "") {
          this.showRemind = true;
          this.errorRemind = "请输入项目名称";
          setTimeout(() => {
            this.showRemind = false;
            this.errorRemind = "";
          }, 2000);
        } else {
          let newObj = {};
          (newObj["loginUserId"] = localStorage.getItem("loginUserId")),
            (newObj["logintoken"] = window.localStorage.getItem("logintoken"));
          newObj["projectName"] = this.title;
					newObj["projectId"] = this.$route.query.projectId;
          if (this.address !== "") {
            newObj["address"] = this.address;
          }
          if (this.Remarks !== "") {
            newObj["description"] = this.Remarks;
          }
          if (this.majorUserId !== "") {
            newObj["userId"] = this.majorUserId;
          }
        if (this.clientId !== "") {
            newObj["clientId"] = this.clientId;
          }
          const { data } = await postHttp.post(
            "/Project/editProject",
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
          this.errorRemind = "请输入项目名称";
          setTimeout(() => {
            this.showRemind = false;
            this.errorRemind = "";
          }, 2000);
        } else {
          let newObj = {};
          (newObj["loginUserId"] = localStorage.getItem("loginUserId")),
            (newObj["logintoken"] = window.localStorage.getItem("logintoken"));
          newObj["projectName"] = this.title;

          if (this.address !== "") {
            newObj["address"] = this.address;
          }
          if (this.Remarks !== "") {
            newObj["description"] = this.Remarks;
          }
          if (this.clientId !== "") {
            newObj["clientId"] = this.clientId;
          }
           if (this.majorUserId !== "") {
            newObj["userId"] = this.majorUserId;
          }
        
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
            "/Project/editProject",
            newObj
          );
          console.log(data);
          if (!data.error) {
            this.showRemind = true;
            this.errorRemind = "创建成功";
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          } else {
            alert(data.message);
          }
        }
      }
    },
    close_majoruser(data) {
      this.showMajorUser = false;
      if (data.name !== "") {
        this.majorUserName = data.name;
        this.majorUserId = data.id;
      }
    },
    close_Clients(data) {
      this.showClient = false;
      if (data.name !== "") {
        this.clientTitle = data.name;
        this.clientId = data.id;
      }
    },
    close_Friends(data) {
			this.choiceUserListsParents = data;
			this.showFriends = false;
			console.log(data)
			if (this.editDays === true) {
				this.editCalendarPar ()
			}
		},
		async editCalendarPar () {
			let newObj = {}
			newObj["loginUserId"] = window.localStorage.getItem("loginUserId")
			newObj["logintoken"] = window.localStorage.getItem("logintoken")
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
			newObj['scheduleId'] = this.$route.query.scheduleId
			const { data } = await postHttp.post(
				"/Calendar/editCalendarPar",
				newObj
			);
			console.log(data)
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
      console.log(data);
      if (!data.error) {
        data.data.forEach(v=>{
        	v.status = false
        })
        this.projectLists = data.data;
      } else {
        alert(data.message);
      }
    },
    //获取所有客户
    async getAllClientInfo() {
      const { data } = await postHttp.post("/Index/getAllClientInfo", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken")
      });
      console.log(data);
      if (!data.error) {
        data.data.forEach(v=>{
        	v.status = false
        })
        this.clientLists = data.data;
      } else {
        alert(data.message);
      }
    },
    // 获取项目详情
    async getProjectInfo(id) {
      const { data } = await postHttp.post("/Project/getProjectInfo", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken"),
        projectId: id
      });
      if (!data.error) {
        let dayDetails = data.data;
        this.title = dayDetails.projectName;
        if (dayDetails.clientId) {
          this.clientTitle = dayDetails.clientName;
          this.clientId = dayDetails.clientId;
        }
         if (dayDetails.userId) {
         
          dayDetails.userList.forEach(element => {
              if(element.userId==dayDetails.userId){
                this.majorUserName = element.userName;
              }
          });
          this.majorUserId = dayDetails.userId;
        }
        this.address = dayDetails.address;
        this.Remarks = dayDetails.description;
        this.choiceUserListsParents = [];
        dayDetails.userList.forEach((v,index) => {
					if (index>0) {
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
    }
  },
  created() {
    this.getNiuFaUser();
    this.getAllClientInfo();
    if (this.$route.query.projectId) {
			this.editDays = true
      this.getProjectInfo(this.$route.query.projectId);
    } else {
			this.editDays = false			
      // let dateAfter = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);
      // this.endTime = this.formatEnd(dateAfter);
      // this.pickerVisibleEnd = dateAfter;
      // this.pickerVisible = new Date();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.create-project {
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
      color: #999;
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
