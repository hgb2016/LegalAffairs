<template>
<div class="day">
	<can-demo :infomationList="infomationList"></can-demo>
	<index-list :infomationList="infomationList"></index-list>
	<div class="day-add" @click="$router.push('/AddDay')">
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
			beginTime:formatDatetime(new Date()-7*24*3600*1000),
			endTime:currentThird(),
			loginUserId: "",
      logintoken: "",
		}
	},
	methods :{
		async getMyCalendar() {
      const { data } = await postHttp.post("/Calendar/getMyCalendar", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken,
        beginTime:this.beginTime,
        endTime:this.endTime
      });
      if (!data.error) {
        this.infomationList = data.data;
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
