<template>
  <div class="cdetails">

</template>

<script>
import AddContact from "base/AddContact";
import postHttp from "../../assets/js/postHttp.js";
import ErrorRemind from "base/ErrorRemind.vue";
export default {

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
      font-size: 14px;
    }
    span {
      color: #999;
      font-size: 14px;
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
