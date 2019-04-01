<template>
  <div class="day-details">
		<div class="day-details-input">
			<h4>该日程于3-30 11：24创建</h4>
			<span  @click="$router.push('/UserInput?title=标题&content=我来了')">李艳彪</span>
		</div>	
		<div class="day-details-twoTime">
			<div class="during">
				<div class="during-start" @click="getStart">
					<span>开始</span>
					<p>{{startTime.split(' ')[1]}}</p>
					<span>{{startTime.split(' ')[0]}}</span>
				</div>
				<div class="during-hour">
					<hr>
					<span>{{TimeDiff}}小时</span>
					<hr>
				</div>
				<div class="during-end" @click="getEnd">
					<span>结束</span>
					<p>{{endTime.split(' ')[1]}}</p>
					<span>{{endTime.split(' ')[0]}}</span>
				</div>
			</div>
		</div>
		<div class="day-details-list">
			<ul>
				<li>
					<div @click="goTime">
						<img src="../../assets/img/icon_notify.png" alt="">
						<span>准点提醒、提前5分钟</span>
					</div>
					<img src="../../assets/img/arrow.png" alt="">
				</li>
				<li>
					<div>
						<img src="../../assets/img/icon__players.png" alt="">
						<p>	
							<img src="../../assets/img/liyan.jpg" alt="">
							<span>Slienttears</span>
						</p>
					</div>
					<img src="../../assets/img/arrow.png" alt="">
				</li>
				<li>
					<div @click="$router.push('/UserInput?title=地址&content=啦啦啦')">
						<img class="threeImg" src="../../assets/img/location_2.png" alt="">
						<span>啦啦啦</span>
					</div>
					<img src="../../assets/img/arrow.png" alt="">
				</li>
				<li>
					<p class="b" @click="$router.push('/UserInput?title=备注&content=我是备注')">
						备注
					</p>
				</li>
				<li>
					<div>
						<img src="../../assets/img/icon_appendix.png" alt="">
					</div>
					<img src="../../assets/img/arrow.png" alt="">
				</li>
			</ul>
		</div>

		<mt-datetime-picker
			v-model="pickerVisible"
			type="datetime"
			ref="picker"
			@confirm="closeTimePicker">
		</mt-datetime-picker>
		<mt-datetime-picker
			v-model="pickerVisibleEnd"
			type="datetime"
			ref="pickerEnd"
			@confirm="closeTimePickerEnd">
		</mt-datetime-picker>
		<error-remind  v-if="showRemind" @Close_errorMind="showRemind = false" :errorRemind="errorRemind"></error-remind>
	</div>
</template>

<script>
import icon_checkempty from "@/assets/img/icon_checkempty.png";
import check_green from "@/assets/img/check_green.png";
import ErrorRemind from "base/ErrorRemind.vue";

export default {
  components: {
    ErrorRemind
  },
  data() {
    return {
      peopleList: [
        {
          name: "工作",
          status: false,
          img: icon_checkempty,
          clickImg: check_green
        },
        {
          name: "私人",
          status: false,
          img: icon_checkempty,
          clickImg: check_green
        }
      ],
      idx: -1,
      Remarks: "",
      address: "",
      showLis: false,
      pickerVisible: new Date(),
      startTime: this.defaultDate(),
      endTime: "",
      timeMark: "start",
      showRemind: false,
      errorRemind: "",
      pickerVisibleEnd: ""
    };
  },
  computed: {
    TimeDiff() {
      return this.keepTwo(
        parseInt(this.pickerVisibleEnd - this.pickerVisible) / 1000 / 60 / 60
      );
    }
  },
  methods: {
    keepTwo(num) {
      let result = parseFloat(num);
      if (isNaN(result)) {
        return false;
      }
      result = Math.round(num * 100) / 100;
      let s_x = result.toString();
      let pos_decimal = s_x.indexOf(".");
      if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += ".";
      }
      while (s_x.length <= pos_decimal + 2) {
        s_x += "0";
      }
      return s_x;
		},
    // 起始的默认时间
    defaultDate() {
      var y = new Date().getFullYear();
      var m =
        new Date().getMonth() + 1 <= 9
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      var d =
        new Date().getDate() <= 9
          ? "0" + new Date().getDate()
          : new Date().getDate();
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
    getStart() {
      this.$refs.picker.open();
    },
    getEnd() {
      this.$refs.pickerEnd.open();
    },
    formatDatetime(time) {
      if (time === "" || time === null) {
        return;
      } else {
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
          new Date(time).getHours() <= 9
            ? "0" + new Date(time).getHours()
            : new Date(time).getHours();
        let min =
          new Date(time).getMinutes() <= 9
            ? "0" + new Date(time).getMinutes()
            : new Date(time).getMinutes();
        let sec =
          new Date(time).getSeconds() <= 9
            ? "0" + new Date(time).getSeconds()
            : new Date(time).getSeconds();
        return y + "-" + m + "-" + d + " " + hour + ":" + min;
      }
    },
    formatEnd(time) {
      return (
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1 <= 9
          ? "0" + time.getMonth() + 1
          : time.getMonth() + 1) +
        "-" +
        (time.getDate() <= 9 ? "0" + time.getDate() : time.getDate()) +
        " " +
        (time.getHours() <= 9 ? "0" + time.getHours() : time.getHours()) +
        ":" +
        (time.getMinutes() <= 9 ? "0" + time.getMinutes() : time.getMinutes())
      );
    },
    closeTimePicker() {
      this.startTime = this.formatDatetime(this.pickerVisible);
      let dateAfter = new Date(
        new Date(this.pickerVisible).getTime() + 1 * 60 * 60 * 1000
      );
      this.endTime = this.formatEnd(dateAfter);
      this.pickerVisibleEnd = dateAfter;
    },
    closeTimePickerEnd() {
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
    },
    choiceLists(index) {
      if (this.idx !== index) {
        this.idx = index;
      }
    },
    goTime() {
      this.$router.push("/RemindTime");
    }
  },
  created() {
    let dateAfter = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);
    this.endTime = this.formatEnd(dateAfter);
    this.pickerVisibleEnd = dateAfter;
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.day-details {
  .f-d-f;
  .f-fd-c;
  &-input {
    width: 100%;
    .f-d-f;
		height: 100px;
		.f-fd-c;
		h4 {
			padding:10px 0 0 10px;
			color:#999;
			font-size:12px;
		}
    span {
			width:100%;
			.f-f-1;
			.f-d-f;
			.f-ai-c;
			.f-jc-c;
			font-size:14px;
			font-weight: bold;
			letter-spacing: 2px;
		}
  }
  &-twoTime {
    padding: 0 10px;
		width: 100%;
		border-top:1px solid #e5e5e5;
    .during {
      margin-top: 10px;
      padding: 14px 6px;
      .f-d-f;
      .f-jc-sb;
      &-start,
      &-end {
        .f-d-f;
        .f-fd-c;
        .f-ai-c;
        .f-jc-c;
        span {
          color: #999;
          font-size: 12px;
        }
        p {
          color: #000;
          font-size: 16px;
          margin: 4px 0;
        }
      }
      &-hour {
        .f-d-f;
        .f-ai-c;
        .f-jc-c;
        hr {
          width: 10px;
        }
        span {
          height: 20px;
          padding: 0 8px;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          color: #333;
          border: 1px solid #e5e5e5;
          border-radius: 10px;
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
				.f-d-f;
				.f-jc-sb;
				.f-ai-c;
				padding:0 10px;
				min-height:48px;
				border-top:1px solid #e5e5e5;
				div {
					.f-d-f;
					.f-ai-c;
					.f-f-1;
					img {
						width:26px;
					}
					span {
						color:#333;
						font-size:14px;
					}
					.threeImg {
						width:14px;
						margin:0 6px;
					}
					p{
						padding:4px 0;
						img {
							width:36px;
						}
					}
				}
				img {
					width:10px;
				}
				p{
					color:#999;
					font-size:12px;
					.f-f-1;
				}
			}
			li:last-child {
				border-bottom:1px solid #e5e5e5;
			}
    }
  }
}
</style>
