<template>
<div class="day">
	<can-demo :infomationList="infomationList" @choiceDayLists="choiceDayLists"></can-demo>
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
export default {
	components:{
		CanDemo,
		IndexList
	},
	data () {
		return {
			infomationList:[],
			ExhibitionLists:[],
			beginTime:formatDatetime(new Date()-7*24*3600*1000),
			endTime:currentThird(),
			loginUserId: "",
			logintoken: "",
			mark:true,
			clickDate:''
		}
	},
	methods :{
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
		goAddDay () {
			if (this.clickDate === '') {
				this.$router.push('/AddDay')
			} else {
				this.$router.push(`/AddDay?clickDate=${this.clickDate}`)
			}
		},
		choiceDayLists (data) {
			this.clickDate = this.clickDateDefault(data.replace(/\//g, '-'))
			let newArr = []
			let newData = data.split('/')[0]+'-'+(data.split('/')[1]<10?'0'+data.split('/')[1]:data.split('/')[1]) + '-' + (data.split('/')[2]<10?'0'+data.split('/')[2]:data.split('/')[2])
			this.infomationList.forEach(m =>{
				if (m.beginTime.split(' ')[0] === newData) {
					newArr.push(m)
				}
			})
			this.ExhibitionLists = newArr
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
					if (m.beginTime.split(' ')[0] === this.defaultDate()) {
						this.ExhibitionLists.push(m)
					}
				})
      } else {
        alert(data.message);
      }
		},
		
	},
	created () {
		this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
		this.getMyCalendar();
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
