<template>
  <div class="index">
    <div class="index-banner">
      <img src="http://api.niuer.cn:9080/niufa_chatbot/upload/baner15.png" alt>
    </div>
    <div class="index-nav">
      <div v-for="(item, index) in toolList" :key="index">
        <a :href="item.url">
          <img :src="item.actionNewPic" alt>
		    </a>
        <span>{{item.actionName}}</span>
      </div>
      <div @click="goToolBar">
        <img src="../../assets/img/icon_more.png" alt>
        <span>更多</span>
      </div>
    </div>
    <div class="index-week">
      <ul>
        <li v-for="(item,index) in weekLanguages" :key="index">
          <span>{{item}}</span>
        </li>
      </ul>
      <ul>
        <li v-for="(item,index) in sevenDay" :key="index" @click="choiceTime(item.time,index)">
          <span :class="{'borrdius':index === idx}">{{item.time.split('-')[2]}}</span>
          <p v-if="item.status === true"></p>
        </li>
      </ul>
    </div>
    <index-list :infomationList="ExhibitionLists" :mark="mark"></index-list>
    <div class="index-add" @click="goAddDay">
      <img src="../../assets/img/icon_add.png" alt>
    </div>
  </div>
</template>

<script>
import CanDemo from "base/CanDemo";
import IndexList from "base/IndexList";
import postHttp from "../../assets/js/postHttp.js";
import { formatDatetime } from '../../assets/js/sort.js'
function currentThird () {
	let date1 = new Date();
	let date2 = new Date(date1);
  date2.setDate(date1.getDate() + 14);
  return formatDatetime(date2)
}
function getDates() {//JS获取当前周从星期一到星期天的日期
  let currentTime = new Date()
    var timesStamp = currentTime.getTime();
    var currenDay = currentTime.getDay();
    var newdates =[];
    for (var i = 0; i < 7; i++) {
      var dates ={};
      dates['status'] = false
      dates['time'] = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-')
      newdates.push(dates);
    }
    newdates.forEach((v,index)=>{
      if (v.time.split('-')[2] <= 9) {
        v.time = v.time.split('-')[0] + '-'+ v.time.split('-')[1]+'-'+'0' + v.time.split('-')[2]
      }
    })
  return newdates
}
export default {
  components: {
    CanDemo,
    IndexList,
  },
  data() {
    return {
      loginUserId: "",
      logintoken: "",
      toolList: [],
      bannerList: [],
      beginTime:formatDatetime(new Date()-7*24*3600*1000),
      endTime:currentThird(),
      infomationList:[],
      mark:true,
      default_date:'2019-04-20',
      weekLanguages:['一', '二', '三', '四', '五', '六',"日"],
      sevenDay:getDates(),
      idx:-1,
      clickSelection:'',
      ExhibitionLists:[]
    };
  },
  created() {
    this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
    this.getHotTool();
    this.getBannerList();
    this.getMyCalendar();
    this.getMyCalendarD();
    this.getDates(new Date())
    this.defaultDD()
  },
  methods: {
    goAddDay () {
			if (this.clickSelection === '') {
				this.$router.push('/AddDay')
			} else {
				this.$router.push(`/AddDay?clickDate=${this.clickSelection}`)
			}
		},
    defaultDD () {
      this.sevenDay.forEach((v,index) =>{
        if (v.time.split('-')[2] === this.defaultDate().split('-')[2]) {
          this.idx = index
        }
      })
    },
    // 默认时间
    defaultDate() {
			var y = new Date().getFullYear();
			var m =
				new Date().getMonth() + 1 <= 9
					? "0" + (new Date().getMonth() + 1)
					: new Date().getMonth() + 1;
			var d = new Date().getDate()<= 9?'0'+new Date().getDate():new Date().getDate();
			return y + "-" + m + "-" + d
    },
    clickDateDefault(time) {
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
    choiceTime (data,index) {
      this.idx = index
			this.clickSelection = this.clickDateDefault(data)
			let newArr = []
			this.infomationList.forEach(m =>{
				if (this.nowInDateBetwen(m.beginTime.split(' ')[0],m.endTime.split(' ')[0],data)) {
					newArr.push(m)
				}
			})
      console.log(newArr)
			this.ExhibitionLists = newArr
    },
    getDates(currentTime) {//JS获取当前周从星期一到星期天的日期
      var timesStamp = currentTime.getTime();
      var currenDay = currentTime.getDay();
      var dates = [];
      for (var i = 0; i < 7; i++) {
        dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-'));
      }
    },
    dateClickhandler (data) {
    },
    async getMyCalendar() {
      const { data } = await postHttp.post("/Calendar/getMyCalendar", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken,
        beginTime:this.beginTime,
        endTime:this.endTime
      });
      if (!data.error) {
        data.data.forEach(v => {
          let currentdate = new Date()
					let vDate = new Date(v.endTime.replace(/\//g, '-'))
          if (currentdate>vDate) {
            v.markTime = true
          } else {
            v.markTime = false
          }
        });
        this.infomationList = data.data;
				data.data.forEach(m =>{
					if (this.nowInDateBetwen(m.beginTime.split(' ')[0],m.endTime.split(' ')[0],this.defaultDate())) {
						this.ExhibitionLists.push(m)
					}
				})
      } else {
        alert(data.message);
      }
    },
    nowInDateBetwen(d1, d2, date) {
        var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
        var dateEnd = new Date(d2.replace(/-/g, "/"));//将-转化为/，使用new Date
        var dateNow = new Date(date.replace(/-/g, "/"));//将-转化为/，使用new Date
        var beginDiff = dateNow.getTime() - dateBegin.getTime();//时间差的毫秒数
        var beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000));//计算出相差天数
        var endDiff = dateEnd.getTime() - dateNow.getTime();//时间差的毫秒数
				var endDayDiff = Math.floor(endDiff / (24 * 3600 * 1000));//计算出相差天数
				if (endDayDiff >= 0 && beginDayDiff >= 0) {//已过期
					return true
        }
        return false;
    },
    async getMyCalendarD() {
      const { data } = await postHttp.post("/Calendar/getMyCalendarData", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken,
        userId: this.loginUserId,
        beginTime:this.beginTime,
        endTime:this.endTime
      });
      if (!data.error) {
        console.log(data)
        data.data.forEach(m=>{
          this.sevenDay.forEach(v=>{
            if (m.showDate.split('-')[2] === v.time.split('-')[2]) {
              v['status'] = true
            }
          })
        })
      } else {
        alert(data.message);
      }
    },
    goToolBar() {
      this.$router.push("/ToolBar");
    },
    async getHotTool() {
      const { data } = await postHttp.post("/Index/getHotTool", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken
      });
      if (!data.error) {
        this.toolList = data.data;
      } else {
        alert(data.message);
      }
    },
    async getBannerList() {
      const { data } = await postHttp.post("/Index/getBannerList", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken
      });
      if (!data.error) {
        this.bannerList = data.data;
      } else {
        alert(data.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.index {
  padding: 60px 0;
  &-banner {
    padding: 0 10px;
    img {
      width: 100%;
    }
  }
  &-nav {
    .f-d-f;
    div {
      margin-top: 10px;
      .f-f-1;
      .f-d-f;
      .f-fd-c;
      padding: 10px 0;
      .f-ai-c;
      .f-jc-c;
      img {
        width: 36px;
      }
      span {
        font-size: 12px;
        color: #333;
        margin-top: 6px;
      }
    }
  }
  &-week {
    width:100%;
    .f-d-f;
    .f-fd-c;
    border-top:1px solid #e9e9e9;
    border-bottom:1px solid #e9e9e9;
    padding:4px 0 18px;
    ul {
      .f-d-f;
      li {
        .f-f-1;
        .f-d-f;
        .f-ai-c;
        .f-jc-c;
        span {
          color:#333;
          font-size:12px;
          padding:4px;
        }
      }
    }
    ul + ul {
      margin-top:10px; 
      li {
        position: relative;
        .borrdius {
          background-color: #0D73EA;
          border-radius: 50%;
          color:#fff;
        }
        p {
          position: absolute;
          bottom: -8px;
          left: 50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background-color: red;
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
        .list-time {
          .f-d-f;
          .f-fd-c;
          padding: 10px 20px;
          div {
            span {
              color: #333;
              font-size: 14px;
            }
          }
          div + div {
            .f-d-f;
            .f-fd-c;
            margin-top: 10px;
            span {
              color: #999;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  &-add {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 28px;
    height: 28px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
