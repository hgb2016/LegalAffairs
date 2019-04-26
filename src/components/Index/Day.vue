<template>
<div class="day">
	<can-demo :infomationList="sevenDay" @choiceDayLists="choiceDayLists" @changeDate="changeDate"></can-demo>
	<index-list :infomationList="ExhibitionLists" :mark="mark"></index-list>
	<div class="day-add" @click="goAddDay">
		<img src="../../assets/img/icon_add.png" alt="">
	</div>
</div>
</template>

<script>
import CanDemo from 'base/CanDemo'
import IndexList from 'base/IndexList'
import postHttp from "../../assets/js/postHttp.js";
import { formatDatetime } from '../../assets/js/sort.js'
function currentThird () {
	let date1 = new Date();
	let date2 = new Date(date1);
  date2.setDate(date1.getDate() + 14);
	return formatDatetime(date2)
}
function getCurrentMonthFirst(){
	var date =new Date();
	date.setDate(1);
	var month = parseInt(date.getMonth()+1);
	var day = date.getDate();
	if (month < 10) {
			month = '0' + month
	}
	if (day < 10) {
			day = '0' + day
	}
	return date.getFullYear() + '-' + month + '-' + day;
}
function getCurrentMonthLast(){
	var date=new Date();
	var currentMonth=date.getMonth();
	var nextMonth=++currentMonth;
	var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
	var oneDay=1000*60*60*24;
	var lastTime = new Date(nextMonthFirstDay-oneDay);
	var month = parseInt(lastTime.getMonth()+1);
	var day = lastTime.getDate();
	if (month < 10) {
			month = '0' + month
	}
	if (day < 10) {
			day = '0' + day
	}
	return date.getFullYear() + '-' + month + '-' + day 
}
export default {
	components:{
		CanDemo,
		IndexList
	},
	data () {
		return {
			ExhibitionLists:[],
			beginTime:getCurrentMonthFirst(),
			endTime:getCurrentMonthLast(),
			loginUserId: "",
			logintoken: "",
			mark:true,
			clickDate:'',
			sevenDay:[],
			infomationList:[]
		}
	},
	methods :{
		getCurrentMonthFirst(time){
			var date =new Date(time);
			date.setDate(1);
			var month = parseInt(date.getMonth()+1);
			var day = date.getDate();
			if (month < 10) {
					month = '0' + month
			}
			if (day < 10) {
					day = '0' + day
			}
			return date.getFullYear() + '-' + month + '-' + day;
		},
		getCurrentMonthLast(time){
			var date=new Date(time);
			var currentMonth=date.getMonth();
			var nextMonth=++currentMonth;
			var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
			var oneDay=1000*60*60*24;
			var lastTime = new Date(nextMonthFirstDay-oneDay);
			var month = parseInt(lastTime.getMonth()+1);
			var day = lastTime.getDate();
			if (month < 10) {
					month = '0' + month
			}
			if (day < 10) {
					day = '0' + day
			}
			return date.getFullYear() + '-' + month + '-' + day 
		},
		changeDate (data,status) {
			this.ExhibitionLists = []
			this.infomationList = []
			this.sevenDay = []
			this.beginTime = this.getCurrentMonthFirst(data)
			this.endTime = this.getCurrentMonthLast(data)
			if (status === true) {
				this.getMyCalendar(true,data)
			} else {
				this.getMyCalendar(false,'')
			}
			this.getMyCalendarD()
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
        return y + "-" + m + "-" + d + " " + hour + ":" + min;
    },
		goAddDay () {
			if (this.clickDate === '') {
				this.$router.push('/AddDay')
			} else {
				this.$router.push(`/AddDay?clickDate=${this.clickDate}`)
			}
		},
		choiceDayLists (data) {
			console.log(data)
			let newClick = data.replace(/\//g, '-')
			this.clickDate = this.clickDateDefault(data)
			let newArr = []
			this.infomationList.forEach(m =>{
				if (this.nowInDateBetwen(m.beginTime.split(' ')[0],m.endTime.split(' ')[0],newClick)) {
					newArr.push(m)
				}
			})
			console.log(newArr)
			this.ExhibitionLists = newArr
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
		defaultDate() {
			var y = new Date().getFullYear();
			var m =
				new Date().getMonth() + 1 <= 9
					? "0" + (new Date().getMonth() + 1)
					: new Date().getMonth() + 1;
			var d = new Date().getDate()<= 9?'0'+new Date().getDate():new Date().getDate();
			return y + "-" + m + "-" + d
    },
		async getMyCalendar(status,timeStr) {
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
				if (status === false) {
					data.data.forEach(m =>{
						if (this.nowInDateBetwen(m.beginTime.split(' ')[0],m.endTime.split(' ')[0],this.defaultDate())) {
							this.ExhibitionLists.push(m)
						}
					})
				} else {
					let twotimeStr = timeStr.split('-')[0]+'-'+timeStr.split('-')[1] + '-'+'01'
					data.data.forEach(m =>{
						if (this.nowInDateBetwen(m.beginTime.split(' ')[0],m.endTime.split(' ')[0],twotimeStr)) {
							this.ExhibitionLists.push(m)
						}
					})
				}
      } else {
        alert(data.message);
      }
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
				this.sevenDay = data.data
      } else {
        alert(data.message);
      }
    },
	},
	created () {
		this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
		this.getMyCalendar(false,'');
		this.getMyCalendarD()
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/css/flex.less';
.day {
	padding:60px 0;
	&-add{
		position: fixed;
		bottom:80px;
		right:20px;
		width:28px;
		height:28px;
		img {
			width:100%;
			height:100%;
		}
	}
}
	
</style>
