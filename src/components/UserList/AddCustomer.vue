<template>
  <div class="add-customer">
		<div class="add-customer-input">
			<input type="text"  placeholder="请输入客户名称" v-model="clientName">
		</div>
		<div class="add-customer-info">
			<div class="info" @click="twoScale">
				<span>客户信息</span>
				<img src="../../assets/img/down.png" alt="">
			</div>
			<transition name="fade">
				<div class="info hideFive" v-if="scaleInfo">
					<div>
						<p>网址</p>
						<input type="text" placeholder="请输入网址" v-model="clientWebsite">
					</div>
					<div>
						<p>电话</p>
						<input type="number" placeholder="请输入电话" v-model="clientPhone">
					</div>
					<div>
						<p>传真</p>
						<input type="text" placeholder="请输入传真" v-model="clientFax">
					</div>
					<div>
						<p>地址</p>
						<input type="text" placeholder="请输入地址" v-model="clientAddress">
					</div>
					<div>
						<p>描述</p>
					</div>
					<div>
						<textarea name="" id="" rows="5" v-model="clientRemark" placeholder="请输入描述"></textarea>
						<!-- <input type="text" placeholder="请输入描述" v-model="clientRemark"> -->
					</div>
				</div>
			</transition>
			<div class="info" @click="openContact">
				<span>联系人信息</span>
				<img src="../../assets/img/contact_add.png" alt="">
			</div>
			<div class="cist" v-for="(item,index) in contactLists" :key="index">
				<img class="jian" src="../../assets/img/icon_dele.png" @click="deletecus(index)" alt="">
				<div>
					<span>{{item.name}}{{item.work?'-'+item.work:''}}</span>
					<span>{{item.phone}}</span>
					<span>{{item.email}}</span>
				</div>
				<img class="update" src="../../assets/img/pen.png" @click="goDetails(index,item.name,item.phone,item.work,item.email)" alt="">
			</div>
			<div class="info-d">
				<div class="info-d-part">
					<h3>谁可见</h3>
					<div class="part-i">
						<ul>
							<li v-for="(item,index) in choiceUserListsParents" :key="index">
								<delete-img :item="item" @closeDelete="closeDelete"  :details="'true'"></delete-img>
							</li>
						</ul>
					</div>
				</div>
				<p>
					<img @click="goMyFriends" src="../../assets/img/contact_add.png" alt="">
				</p>
			</div>
		</div>
		<div class="add-customer-btn">
			<button @click="addeditClient">
				确定
			</button>
		</div>
		<error-remind  v-if="showRemind" @Close_errorMind="showRemind = false" :errorRemind="errorRemind"></error-remind>
		<transition name="fade">
			<add-friends :choiceUserListsParents="choiceUserListsParents" :showFriends="showFriends" @close_Friends="close_Friends" :contactlist="partInlist"></add-friends>
		</transition>
			<add-contact v-if="showContact" :clicentIndex="clicentIndex" @SaveAdd="SaveAdd" :name="updatename" :work="updatework" :phone="updatephone" :email="updateemail"></add-contact>
		
	</div>
</template>

<script>
import AddContact from "base/AddContact";
import liyan from "@/assets/img/liyan.jpg";
import DeleteImg from "base/DeleteImg";
import postHttp from "../../assets/js/postHttp.js";
import AddFriends from "base/AddFriends.vue";
import ErrorRemind from "base/ErrorRemind.vue";

export default {
  components: {
    AddContact,
    DeleteImg,
		AddFriends,
		ErrorRemind
  },
  data() {
    return {
			showRemind:false,
			errorRemind:'',
      scaleInfo: false,
      showContact: false,
      contactLists: [

			],
			clientName:'',
			clientAddress:'',
			clientPhone:'',
			clientWebsite:'',
			clientRemark:'',
			clientFax:'',
      updatename: "",
      updatephone: "",
			updateemail: "",
			updatework:'',
      choiceUserLists: [
       
      ],
      // 参与人
      showFriends: false,
      choiceUserListsParents: [],
			partInlist: [],
			// 编辑联系人的ID
			clicentIndex:-1
    };
  },
  created() {
		this.getNiuFaUser();
		if (this.$route.query.clientId) {
			this.scaleInfo = true
			this.getClientDetails(this.$route.query.clientId)
    }
  },
  methods: {
		// 获取客户详情
		async getClientDetails (id) {
			const { data } = await postHttp.post("/Client/getClientInfo", {
        loginUserId: window.localStorage.getItem("loginUserId"),
				logintoken:window.localStorage.getItem("logintoken"),
				clientId:id
			});
			console.log(data)
      if (!data.error) {
				let newClientDetails = data.data
				this.clientName = newClientDetails.clientName
				this.clientAddress = newClientDetails.clientAddress
				this.clientPhone = newClientDetails.clientPhone
				this.clientWebsite = newClientDetails.clientWebsite
				this.clientRemark = newClientDetails.clientRemark
				this.clientFax = newClientDetails.clientFax
				this.choiceUserListsParents= []
				if (newClientDetails.userList.length>0) {
					newClientDetails.userList.forEach((v,index) => {
						if (index>0) {
							let newUsers = {};
							newUsers["id"] = v.userId;
							newUsers["img"] = v.headUrl;
							newUsers["name"] = v.userName;
							this.choiceUserListsParents.push(newUsers);
						}
					});
				}
				
				if (newClientDetails.contactlist.length>0) {
					this.contactLists = []
					newClientDetails.contactlist.forEach(v=>{
						let newArrUser = {}
						newArrUser['name'] = v.contactsName
						newArrUser['work'] = v.duty
						newArrUser['email'] = v.email
						newArrUser['phone'] = v.mobilePhone
						this.contactLists.push(newArrUser)
					})
				}
			}
		},
		// 编辑客户
		async updateClient () {
			let newObj = {};
			newObj["loginUserId"] = localStorage.getItem("loginUserId")
			newObj["logintoken"] = window.localStorage.getItem("logintoken")
			newObj["clientName"] = this.clientName;
			newObj["clientId"] = this.$route.query.clientId
			if (this.clientAddress !== "") {
				newObj["clientAddress"] = this.clientAddress;
			}
			if (this.clientPhone !== "") {
				newObj["clientPhone"] = this.clientPhone;
			}
			if (this.clientWebsite !== "") {
				newObj["clientWebsite"] = this.clientWebsite;
			}
			if (this.clientRemark !== "") {
				newObj["clientRemark"] = this.clientRemark;
			}
			if (this.clientFax !== "") {
				newObj["clientFax"] = this.clientFax;
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
			if (this.contactLists.length>0) {
				let newArrCon = [];
				this.contactLists.forEach(v => {
					let newObjCon = {};
					
					newObjCon["contactsName"] = v.name;
					if (v.phone !== '') {
						newObjCon["mobilePhone"] = v.phone;
					}
					if (v.work !== '') {
						newObjCon["duty"] = v.work;
					}
					if (v.email !== '') {
						newObjCon["email"] = v.email;
					}
					newArrCon.push(newObjCon);
				});
				newObj["contactlist"] = newArrCon;
			}
			const { data } = await postHttp.post("/Client/editClient", newObj);
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
		},
    // 添加客户
    async addeditClient() {
			if (this.$route.query.clientId) {
				if (this.clientName ==='') {
					this.showRemind = true
					this.errorRemind = '客户标题不能为空'
				} else {
					// 修改可见的联系人
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
					newObj['clientId'] = this.$route.query.clientId
					const { data } = await postHttp.post(
						"/Client/editClientuser",
						newObj
					);
					if (!data.error) {
						this.updateClient()
					} else {
						this.showRemind = true
						this.errorRemind = data.message
						setTimeout(()=>{
							this.showRemind = false
						},2000)
					}
				}
			} else {
				if (this.clientName === "") {
					this.showRemind = true;
					this.errorRemind = "请输入客户名称";
					setTimeout(() => {
						this.showRemind = false;
						this.errorRemind = "";
					}, 2000);
				} else {
					let newObj = {};
					newObj["loginUserId"] = localStorage.getItem("loginUserId")
					newObj["logintoken"] = window.localStorage.getItem("logintoken")
					newObj["clientName"] = this.clientName;
					if (this.clientAddress !== "") {
						newObj["clientAddress"] = this.clientAddress;
					}
					if (this.clientPhone !== "") {
						newObj["clientPhone"] = this.clientPhone;
					}
					if (this.clientWebsite !== "") {
						newObj["clientWebsite"] = this.clientWebsite;
					}
					if (this.clientRemark !== "") {
						newObj["clientRemark"] = this.clientRemark;
					}
					if (this.clientFax !== "") {
						newObj["clientFax"] = this.clientFax;
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
					if (this.contactLists.length>0) {
						let newArrCon = [];
						this.contactLists.forEach(v => {
							let newObjCon = {};
							
							newObjCon["contactsName"] = v.name;
							if (v.phone !== '') {
								newObjCon["mobilePhone"] = v.phone;
							}
							if (v.work !== '') {
								newObjCon["duty"] = v.work;
							}
							if (v.email !== '') {
								newObjCon["email"] = v.email;
							}
							newArrCon.push(newObjCon);
						});
						newObj["contactlist"] = newArrCon;
					}
					const { data } = await postHttp.post("/Client/editClient", newObj);
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
    close_Friends(data) {
      this.choiceUserListsParents = data;
      this.showFriends = false;
    },
    // 获取用户
    async getNiuFaUser() {
      const { data } = await postHttp.post("/Index/getNiuFaUser", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken")
      });
      if (!data.error) {
        data.data.forEach(v => {
          v.status = false;
        });
        this.partInlist = data.data;
      } else {
        alert(data.message);
      }
    },
    goMyFriends() {
      this.showFriends = true;
    },
    closeDelete() {},
    deletecus(index) {
      this.contactLists.splice(index, 1);
    },
    twoScale() {
      if (this.scaleInfo === false) {
        this.scaleInfo = true;
      } else {
        this.scaleInfo = false;
      }
    },
    SaveAdd(val) {
      if (val) {
				if (val.clicentIndex === -1) {
        	this.contactLists.push(val);
				} else {
					this.contactLists[val.clicentIndex]['name'] = val.name
					this.contactLists[val.clicentIndex]['phone'] = val.phone
					this.contactLists[val.clicentIndex]['work'] = val.work
					this.contactLists[val.clicentIndex]['email'] = val.email
				}
      }
      this.showContact = false;
    },
    goDetails(index,name, phone,work, email) {
			this.clicentIndex = index
      this.updatename = name;
      this.updatephone = phone;
      this.updatework = work;
      this.updateemail = email;
      this.showContact = true;
    },
    openContact() {
			this.clicentIndex = -1
      this.updatename = "";
			this.updatephone = "";
      this.updatework = ''
      this.updateemail = "";
      this.showContact = true;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.add-customer {
  min-height: 100vh;
  padding: 38px 0 50px;
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
  &-input {
    height: 60px;
    .f-d-f;
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
  &-info {
    .f-d-f;
    .f-fd-c;
    .info {
      .f-d-f;
      .f-jc-sb;
      .f-ai-c;
      padding: 0 20px;
      height: 50px;
      border-bottom: 1px solid #e5e5e5;
      span {
        font-size: 14px;
        color: #333;
      }
      img {
        width: 22px;
      }
    }
    .info-d {
      .f-d-f;
      .f-ai-c;
      .f-jc-sb;
      padding: 0 20px;
      min-height: 50px;
      border-bottom: 1px solid #e5e5e5;
      .info-d-part {
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
            .f-d-f;
            .f-fd-r;
            .f-fw-w;
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
    .hideFive {
      .f-d-f;
      .f-fd-c;
      height: auto;
      div {
				width: 100%;
				padding:12px 8px;
        .f-d-f;
        .f-jc-sb;
        .f-ai-c;
        p {
          color: #666;
          font-size: 14px;
        }
        input {
          text-align: right;
          font-size: 14px;
          color: #333;
				}
				textarea {
					width:100%;
					color:#333;
					font-size:14px;
				}
      }
    }
    .cist {
      .f-d-f;
      border-bottom: 1px solid #e5e5e5;
      .f-jc-sb;
      .f-ai-c;
      padding: 8px 20px;
      div {
        .f-f-1;
        .f-d-f;
        .f-fd-c;
        padding-left: 20px;
        span {
          color: #2d75ee;
          font-size: 14px;
          margin-top: 6px;
        }
        span:first-child {
          margin-top: 0;
        }
      }
      .jian {
        width: 16px;
      }
      .update {
        width: 20px;
      }
    }
  }
}
</style>
