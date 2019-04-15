<template>
  <div class="cdetails">
    <div class="cdetails-title">
      <p>{{clientDetails.clientName}}</p>
      <span>{{clientDetails.clientRemark}}</span>
    </div>
    <div class="cdetails-list">
      <ul>
        <li v-if="clientDetails.clientWebsite">
          <div>
            <img width="15" src="../../assets/img/link.png" alt>
          </div>
          <!-- 网址 -->
          <span>{{clientDetails.clientWebsite}}</span>
        </li>
        <li v-if="clientDetails.clientAddress">
          <!-- 地址 -->
          <div>
            <img width="28" src="../../assets/img/location1.png" alt>
          </div>

          <span>{{clientDetails.clientAddress}}</span>
        </li>
        <li v-if="clientDetails.clientPhone">
          <!-- 电话 -->
          <div>
            <img width="28" src="../../assets/img/lianxiwomen.png" alt>
          </div>

          <span>{{clientDetails.clientPhone}}</span>
        </li>
        <li v-if="clientDetails.clientFax">
          <!-- 传真 -->
          <div>
            <img width="15" src="../../assets/img/printing.png" alt>
          </div>

          <span class="bgc">{{clientDetails.clientFax}}</span>
        </li>
      </ul>
    </div>
    <div class="cdetails-delete">
      <!-- <span>联系人信息（长按信息可以删除）</span> -->
      <span>联系人信息</span>
      <!-- <img src="../../assets/img/contact_add.png" alt="" @click="addInfo"> -->
    </div>
    <div
      class="cdetails-user"
      v-if="clientDetails.contactlist && clientDetails.contactlist.length>0"
    >
      <div class="cdetails-user-me" v-for="(item,index) in clientDetails.contactlist" :key="index">
        <div>
          <span>{{item.contactsName}}-{{item.duty}}</span>
          <span>{{item.mobilePhone}}</span>
          <span>{{item.email}}</span>
        </div>
        <!-- <img class="update" src="../../assets/img/pen.png" @click="updateInfo" alt=""> -->
      </div>
    </div>
    <div class="cdetails-img">
      <img class="img-i" src="../../assets/img/icon__in.png" alt>
      <div class="img-lists" v-if="clientDetails.userList && clientDetails.userList.length>0">
        <div
          
          v-for="(item,index) in clientDetails.userList"
          :key="index"
        >
          <img :src="item.headUrl" alt>
          <span>{{item.userName}}</span>
        </div>
      </div>
      <!-- <img class="img-y" src="../../assets/img/arrow.png" alt=""> -->
    </div>
    <div class="cdetails-btn">
      <button @click="deleteCustomerInfo">删除</button>
      <button @click="updateCustomerInfo">修改</button>
    </div>
    <add-contact
      :name="updatename"
      :phone="updatephone"
      :email="updateemail"
      @SaveAdd="SaveAdd"
      v-if="showAddContact"
    ></add-contact>
  </div>
</template>

<script>
import AddContact from "base/AddContact";
import postHttp from "../../assets/js/postHttp.js";
export default {
  components: {
    AddContact
  },
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      updatename: "",
      updatephone: "",
      updateemail: "",
      showAddContact: false,
      clientDetails: {}
    };
  },
  methods: {
    goDetails() {},
    updateInfo() {
      this.updatename = this.name;
      this.updatephone = this.phone;
      this.updateemail = this.email;
      this.showAddContact = true;
    },
    addInfo() {
      this.updatename = "";
      this.updatephone = "";
      this.updateemail = "";
      this.showAddContact = true;
    },
    SaveAdd() {
      this.showAddContact = false;
    },
    // 删除
    async deleteCustomerInfo() {
      const { data } = await postHttp.post("/Client/delClient", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken"),
        clientId: this.$route.query.CustomerDetails
      });
      if (!data.error) {
        this.errorRemind = "删除成功";
        this.showRemind = true;
        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      } else {
        alert(data.message);
      }
    },
    // 修改
    updateCustomerInfo() {
      this.$router.push(
        `/AddCustomer?clientId=${this.$route.query.CustomerDetails}`
      );
    },
    async getClientDetails(id) {
      const { data } = await postHttp.post("/Client/getClientInfo", {
        loginUserId: window.localStorage.getItem("loginUserId"),
        logintoken: window.localStorage.getItem("logintoken"),
        clientId: id
      });
      console.log(data);
      if (!data.error) {
        this.clientDetails = data.data;
      } else {
        alert(data.message);
      }
    }
  },
  created() {
    this.getClientDetails(this.$route.query.CustomerDetails);
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.cdetails {
  padding: 38px 0 50px;
  &-title {
    .f-d-f;
    .f-fd-c;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 10px;
    p {
      color: #333;
      font-size: 16px;
      font-weight: bold;
    }
    span {
      color: #999;
      font-size: 12px;
      margin-top: 8px;
    }
  }
  &-list {
    ul {
      width: 100%;
      .f-d-f;
      .f-fd-c;
      li {
        height: 42px;
        .f-d-f;
        .f-ai-c;
        padding: 0 10px;
        border-bottom: 1px solid #e5e5e5;
        span {
          color: #333;
          font-size: 14px;
          margin-left: 10px;
          .f-f-1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bgc {
          color: #2d75ee;
		}
		div{
			width: 28px;
			.f-d-f;
    .f-fd-c;
    .f-ai-c;
		}
      }
    }
  }
  &-delete {
    height: 42px;
    padding: 0 10px;
    border-bottom: 1px solid #e5e5e5;
    .f-d-f;
    .f-jc-sb;
    .f-ai-c;
    span {
      color: #333;
      font-size: 14px;
    }
    img {
      width: 20px;
    }
  }
  &-user {
    border-bottom: 1px solid #e5e5e5;
    padding: 8px 10px;
    &-me {
      width: 100%;
      .f-d-f;
      .f-jc-sb;
      .f-ai-c;
      padding: 8px 14px;
      background-color: #efeff4;
      border-radius: 6px;
      margin-top: 6px;
      div {
        .f-f-1;
        .f-d-f;
        .f-fd-c;
        span {
          color: #2d75ee;
          font-size: 14px;
          margin-top: 6px;
        }
        span:first-child {
          margin-top: 0;
        }
      }
      .update {
        width: 20px;
      }
    }
  }
  &-img {
    padding: 10px;
    border-bottom: 1px solid #e5e5e5;
    .f-d-f;
    .f-ai-c;
    .f-jc-sb;
    .img-i {
      width: 20px;
    }
    .img-y {
      width: 14px;
    }
    .img-lists {
      .f-f-1;
      .f-fw-w;
      .f-d-f;
      div {
        .f-d-f;
        .f-fd-c;
        .f-fw-w;
        .f-ai-c;
        padding-left: 14px;
        img {
          width: 35px;
          border-radius: 50%;
          height: 35px;
        }
        span {
          width:50px;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #333;
          font-size: 14px;
          margin-top: 4px;
        }
      }
    }
  }
  &-btn {
    margin-top: 20px;
    padding: 0 10px;
    .f-d-f;
    .f-jc-sb;
    position: fixed;
    bottom: 10px;
    width: 100%;
    button {
      width: 40%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      background-color: #ccc;
    }
    button + button {
      background-color: #2d75ee;
      color: #fff;
    }
  }
}
</style>