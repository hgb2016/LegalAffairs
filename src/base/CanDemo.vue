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
					newObj['date'] = this.format(new Date(), v.year.split('月')[1])
					newObj['className'] = "mark1"
					newArr.push(newObj)
				})
				this.arr = newArr
				console.log(this.arr)
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
      console.log("选中了", data);
    },
    //跳到了本月
    clickToday(data) {
      console.log("跳到了本月今天", data);
    },
    //左右点击切换月份
    changeDate(data) {
      console.log("左右点击切换月份", data);
    },
    format(date, index) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
    },
    format(date, index) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
    }
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
	background-color: rgb(254, 90, 90);
	border-radius: 50%;
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