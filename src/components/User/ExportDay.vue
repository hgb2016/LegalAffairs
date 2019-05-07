<template>
  <div class="export">
		<div class="export-day">
			<div class="export-day-nav" v-show="projectName" style="padding-bottom:10px">
				<span>项目：{{projectName}}</span>
			</div>
			<div class="export-day-nav">
				<span>选择导出那个时间段的日程</span>
			</div>
			<div class="export-day-time">
				<div class="items">
					<span>
						开始
					</span>
					<p></p>
					<span>
						结束
					</span>
				</div>
				<div class="items">
					<div :class="{'colDiv1':beginTime==='未选择'}" @click="getStart">
						{{beginTime}}
					</div>
					<p>至</p>
					<div :class="{'colDiv2':endTime==='未选择'}" @click="getEnd">
						{{endTime}}
					</div>
				</div>
			</div>
		</div>
		<div class="export-day">
			<div class="export-day-nav">
				<span>导出的日程会发送到你指定的邮箱</span>
			</div>
			<div class="export-day-input">
				<input type="email" v-model="email" placeholder="请输入邮箱地址">
			</div>
			<h6>若未收到邮件，请确认是否被拦截或者被误认为是垃圾邮件。</h6>
		</div>
		<div class="export-btn">
			<span @click="submitExport">确定</span>
		</div>
		<mt-datetime-picker
      v-model="pickerVisible"
      type="date"
      ref="picker"
			  year-format="{value}年"
       month-format="{value}月"
       date-format="{value}日"
       hour-format="{value}时"
       minute-format="{value}分"
			:visibleItemCount="3"
      @confirm="closeTimePicker"
    ></mt-datetime-picker>
    <mt-datetime-picker
		 
      v-model="pickerVisibleEnd"
      type="date"
      ref="pickerEnd"
			  year-format="{value}年"
       month-format="{value}月"
       date-format="{value}日"
       hour-format="{value}时"
       minute-format="{value}分"
			:visibleItemCount="3"	
      @confirm="closeTimePickerEnd"
    ></mt-datetime-picker>
		<error-remind
      v-if="showRemind"
      @Close_errorMind="showRemind = false"
      :errorRemind="errorRemind"
    ></error-remind>
	</div>
</template>

<script>
import ErrorRemind from "base/ErrorRemind.vue";
import postHttp from "../../assets/js/postHttp.js";
export default {
	components:{
		ErrorRemind
	},
	data () {
		return {
			beginTime:'未选择',
			endTime:'未选择',
			projectName:"",
			pickerVisible: new Date(),
			pickerVisibleEnd: new Date(),
			showRemind:false,
			errorRemind:'',
			email:''
		}
	},
	methods:{
		async submitExport () {
			let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (this.beginTime === '未选择') {
				this.showRemind = true
				this.errorRemind = '请选择开始时间'
				setTimeout(()=>{
					this.showRemind = false
					this.errorRemind = ''
				},2000)
			} else if (this.endTime === '未选择') {
				this.showRemind = true
				this.errorRemind = '请选择结束时间'
				setTimeout(()=>{
					this.showRemind = false
					this.errorRemind = ''
				},2000)
			} else if (this.email === '') {
				this.showRemind = true
				this.errorRemind = '请填写您的邮箱'
				setTimeout(()=>{
					this.showRemind = false
					this.errorRemind = ''
				},2000)
			} else if (!pattern.test(this.email)) {
				this.showRemind = true
				this.errorRemind = '邮箱格式不正确'
				setTimeout(()=>{
					this.showRemind = false
					this.errorRemind = ''
				},2000)
			} else {
				// projectId
				let newObj = {}
				newObj['loginUserId'] =  window.localStorage.getItem("loginUserId")
				newObj['logintoken'] =  window.localStorage.getItem("logintoken")
				newObj['sendEmail'] =  this.email
				newObj['beginTime'] =  this.beginTime
				newObj['endTime'] =  this.endTime
				if (this.$route.query.projectId) {
					newObj['projectId'] =  this.$route.query.projectId
				}
				const { data } = await postHttp.post("/Calendar/exportCalendar", newObj);
				if (!data.error) {
					this.showRemind = true
					this.errorRemind = '已发送到您的邮箱，请查收'
					setTimeout (()=>{
						this.showRemind = false
					},2000)
				}
			}
		},
		getStart() {
      this.$refs.picker.open();
    },
    getEnd() {
      this.$refs.pickerEnd.open();
    },
		closeTimePicker() {
      this.beginTime = this.formatDatetime(this.pickerVisible);
    },
    closeTimePickerEnd() {
			if (this.beginTime === '未选择') {
				this.showRemind = true
				this.errorRemind = '请选择开始时间'
				setTimeout (()=>{
					this.showRemind = false
				},2000)
				this.$refs.pickerEnd.open();
			} else {
				if (this.pickerVisibleEnd < this.pickerVisible) {
					this.showRemind = true;
					this.errorRemind = "结束时间不能小于开始时间";
					setTimeout(() => {
						this.showRemind = false;
					}, 2000);
					this.$refs.pickerEnd.open();
				} else {
					this.endTime = this.formatDatetime(this.pickerVisibleEnd);
				}
			}
      console.log(this.pickerVisibleEnd,this.pickerVisible)
		},
		formatDatetime(time) {
			let y = new Date(time).getFullYear();
			let m =
				new Date(time).getMonth() + 1 <= 9
					? "0" + (new Date(time).getMonth() + 1)
					: new Date(time).getMonth() + 1;
			let d =
				new Date(time).getDate() <= 9
					? "0" + new Date(time).getDate()
					: new Date(time).getDate();
			
			return y + "-" + m + "-" + d
    },
	},
	created () {
		this.email = window.localStorage.getItem('email');
		if (this.$route.query.projectName) {
				this.projectName=this.$route.query.projectName
		}
	},

}
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.export {
	padding:48px 10px;
	&-day {
		box-shadow: 5px 5px 5px #f3f3f3, 5px -5px 5px #f3f3f3,
				-5px 5px 5px #f3f3f3, -5px -5px 5px #f3f3f3;
				margin-top:10px;
				padding:20px 10px;
		&-nav {
			font-size:14px;
			color:#000;
		}
		&-time {
			.f-d-f;
			.f-fd-c;
			.items{
				.f-d-f;
				margin-top:14px;
				p {
					width:30px;
					font-size:12px;
					color:#333;
					.f-d-f;
					.f-ai-c;
					.f-jc-c;
					margin:0 4px;
				}
				span {
					.f-f-1;
					font-size:12px;
					color:#999;
					.f-d-f;
					.f-ai-c;
					.f-jc-c;
				}
				div {
					.f-f-1;
					border:1px solid #e9e9e9;
					border-radius: 2px;
					font-size:14px;
					color:#000;
					text-align: center;
					height:30px;
					line-height: 30px;
				}
				.colDiv1,
				.colDiv2{
					color:#999;
				}
			}
		}
		&-input {
			margin-top:12px;
			border-bottom:1px solid #e5e5e5;
			.f-d-f;
			input {
				.f-f-1;
				height:30px;
				font-size:14px;
				color:#333;
			}
		}
		h6 {
			font-weight: normal;
			color:#999;
			font-size:12px;
			margin-top:6px;
		}
	}
	&-btn {
		margin-top:28px;
		.f-d-f;
		.f-ai-c;
		.f-jc-c;
		span {
			width:80%;
			height:40px;
			.f-d-f;
			.f-ai-c;
			.f-jc-c;
			font-size:14px;
			color:#fff;
			background-color: #2d75ee;
			border-radius: 4px;
		}
	}
}
</style>
