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
      handler(newval,oldval) {
        if (newval !== oldval) {
          let newArr = []
          newval.forEach(v=>{
            let newObj = {}
            let newDay = new Date(v.showDate).getDate()
            newObj['date'] = this.format(v.showDate, newDay)
            newObj['className'] = "mark1"
            newArr.push(newObj)
          })
          this.arr = newArr
        }
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
      this.arr2=[]
      this.$emit('choiceDayLists',data)
      this.arr2=[]
    },
    //跳到了本月
    clickToday(data) {
    },
    //左右点击切换月份
    changeDate(data) {
      let newMonth = new Date().getMonth()+1
      if (data.split('/')[1] == newMonth) {
        this.arr2 = []
        this.$emit('changeDate',data.replace(/\//g, '-'),false)
      } else {
        this.arr2 = []
        this.arr2.push(data.split('/')[0]+'-'+data.split('/')[1] + '-'+1)
        this.$emit('changeDate',data.replace(/\//g, '-'),true)
      }
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