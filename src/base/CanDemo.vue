<template>
  <div class="content">
    <Calendar
      ref="Calendar"
      :markDateMore="arr"
      :markDate="arr2"
      v-on:isToday="clickToday"
      agoDayHide="1530115221"
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
    ></Calendar>
  </div>
</template>

<script>
import Calendar from "base/vue-calendar-component";
export default {
  props: ["infomationList"],
  data() {
    return {
      arr2: [],
      arr: []
    };
  },
  watch: {
    infomationList: {
      handler(val) {
        let newArr = []
				val.forEach(v=>{
          let newObj = {}
          let newDay = new Date(v.showDate).getDate()
					newObj['date'] = this.format(new Date(), newDay)
					newObj['className'] = "mark1"
					newArr.push(newObj)
        })
        this.arr = newArr

      },
      immediate: true
    }
  },
  components: {
    Calendar
  },
  methods: {
    //选中某天
    clickDay(data) {
      this.$emit('choiceDayLists',data)
    },
    //跳到了本月
    clickToday(data) {
    },
    //左右点击切换月份
    changeDate(data) {
      this.$emit('changeDate',data.replace(/\//g, '-'))
    },
    format(date, index) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
    },
  }
};
</script>
<style scoped>
h3 {
  text-align: center;
  width: 90%;
  margin: auto;
}

.div {
  margin: auto;
  width: 220px;
  height: 44px;
  line-height: 44px;
  background: #fff;
  color: #333;
  font-size: 17px;
  text-align: center;
  margin-top: 20px;
}

.wh_container >>> .mark1 {
  position: absolute;
  bottom:-4px;
  left:50%;
  transform: translateX(-50%);
  width: 4px;
  height:4px;
	background-color:red;
}

.wh_container >>> .mark2 {
  background-color: blue;
}
.wh_content_item > .wh_isMark {
  background: orange;
}
.wh_container >>> .wh_content_all {
  /* background-color: red; */
}
</style>