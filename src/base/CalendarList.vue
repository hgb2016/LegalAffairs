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
          <p>{{childItem.createUserName }}</p>
          <p>{{childItem.beginTime}} - {{childItem.endTime}}</p>
        </div>
        <h5>{{childItem.title}}</h5>
        <p>{{childItem.callTime}}</p>
        <span></span>
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
</style>
