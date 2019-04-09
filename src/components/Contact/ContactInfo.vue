<template>
  <div class="ContactInfo">
     <div class="ContactInfo-userinfo">
         <div>
            <img src="" alt="">
         </div>
     </div>
      <div class="ContactInfo-calendarinfo">
     </div>
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
      userId: "",
      userInfo: {},
      userCalInfo:{}
    };
  },
  created() {
    this.userinfo = this.$route.query.userinfo;
    console.log(this.userInfo)
    this.getFriendCalendar();
  },
  methods: {
    async getFriendCalendar() {
      const { data } = await postHttp.post("/Calendar/getFriendCalendar", {
        loginUserId: window.localStorage.getItem('loginUserId'),
        logintoken:  window.localStorage.getItem('logintoken'),
        userId: this.userInfo.userId
      });
      if (!data.error) {
        this.userCalInfo = data.data;
      } else {
        alert(data.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.ContactInfo {
  width: 100%;
  
}
</style>
