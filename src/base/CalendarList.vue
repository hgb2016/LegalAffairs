<template>
  <div class="calendar-list" v-if="calendarList.length>0">
      <div
        class="CalendarList-childItem"
        v-for="(childItem, index) in calendarList"
        :key="index"
        @click="goDayDetails(childItem.scheduleId)"
      >
        <div>
            <img :src="childItem.headUrl" alt>
            <span></span>
          </div>
          <div>
            <p>{{childItem.createUserName }}&nbsp;&nbsp; {{childItem.beginTime}} - {{childItem.endTime}}</p>
            <h5>{{childItem.title}}</h5>
            <p style="color:#0c7dff">{{childItem.callTime}}</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ["calendarList"],
  methods: {
    goDayDetails(id) {
      this.$router.push(`/DayDetails?id=${id}`);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/flex.less";
.CalendarList {
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

}
</style>
