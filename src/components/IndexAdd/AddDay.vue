<template>
  <div class="add-day">
		<div class="add-day-input">
			<input type="text"  placeholder="请输入客户名称">
		</div>	
		<div class="add-day-twoTime">
			<div class="during">
				<div class="during-start" @click="getStart">
					<span>开始</span>
					<p>{{startTime.split(' ')[1]}}</p>
					<span>{{startTime.split(' ')[0]}}</span>
				</div>
				<div class="during-hour">
					<hr>
					<span>100小时</span>
					<hr>
				</div>
				<div class="during-end" @click="getEnd">
					<span>结束</span>
					<p>{{endTime.split(' ')[1]}}</p>
					<span>{{endTime.split(' ')[0]}}</span>
				</div>
			</div>
		</div>
		<div class="add-day-list">
			<ul>
				<li>
					<div class="w-l">
						<span class="tit">此事项为：</span>
						<div>
							<p v-for="(item,index) in peopleList" :key="index" @click="choiceLists(index)">
								<template v-if="index === idx">
									<img :src="item.clickImg" alt="">
								</template>
								<template v-else>
									<img :src="item.img" alt="">
								</template>
								{{item.name}}
							</p>
						</div>
					</div>
				</li>
				<!-- <li>
					<div class="w-l">
						<span class="tit">参与人</span>
						<p>
							<span></span>
							<img src="../../assets/img/contact_add.png" alt="">
						</p>
					</div>
				</li> -->
				<li>
					<div class="w-l">
						<span class="tit">项目</span>
						<p>
							<span>选择项目</span>
							<img class="arrow" src="../../assets/img/arrow.png" alt="">
						</p>
					</div>
				</li>
				<li>
					<div class="w-l">
						<span class="tit">提醒</span>
						<p @click="goTime">
							<span>准点提醒</span>
							<img class="arrow" src="../../assets/img/arrow.png" alt="">
						</p>
					</div>
				</li>
				<li>
					<div class="w-l">
						<span class="tit">提醒</span>
						<p @click="showLis=!showLis">
							<span class="ccColor">地址、备注、附件</span>
							<img class="down" src="../../assets/img/down.png" alt="">
						</p>
					</div>
				</li>
				<li v-if="showLis">
					<div class="w-l" style="padding:0 15px;">
						<span class="tit" style="color:#999">地址</span>
						<p>
							<input type="text" placeholder="请输入地址" v-model="address">
						</p>
					</div>
				</li>
				<li v-if="showLis">
					<div class="w-l" style="padding:0 15px;">
						<span class="tit" style="color:#999">备注</span>
						<p>
							<input type="text" placeholder="请输入备注" v-model="Remarks">
						</p>
					</div>
				</li>
				<li v-if="showLis">
					<div class="w-l w-i" style="padding:0 15px;">
						<span class="tit" style="color:#999">上传附件</span>
						<p>
							<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png">
							<img src="../../assets/img/icon_addpicture.png" alt="">
						</p>
					</div>
				</li>
			</ul>
		</div>
		<mt-datetime-picker
			v-model="pickerVisible"
			type="datetime"
			ref="picker"
			@confirm="closeTimePicker">
		</mt-datetime-picker>
		<error-remind  v-if="showRemind" @Close_errorMind="showRemind = false" :errorRemind="errorRemind"></error-remind>
	</div>
</template>

<script>
import icon_checkempty from '@/assets/img/icon_checkempty.png'
import check_green from '@/assets/img/check_green.png'
import ErrorRemind from "base/ErrorRemind.vue";

export default {
	components:{
		ErrorRemind
	},
	data () {
		return {
			peopleList:[
				{
					name:'工作',
					status:false,
					img:icon_checkempty,
					clickImg:check_green
				},
				{
					name:'私人',
					status:false,
					img:icon_checkempty,
					clickImg:check_green
				},
			],
			idx:-1,
			Remarks:'',
			address:'',
			showLis:false,
			pickerVisible:new Date(),
			startTime:this.defaultDate(),
			endTime: '',
			timeMark:'start',
			showRemind:false,
			errorRemind:''
		}
	},
	methods:{
		// 起始的默认时间
    defaultDate() {
			var y = new Date().getFullYear();
			var m =
				new Date().getMonth() + 1 <= 9
					? "0" + (new Date().getMonth() + 1)
					: new Date().getMonth() + 1;
			var d = new Date().getDate()<= 9?'0'+new Date().getDate():new Date().getDate();
			let hour = new Date().getHours()<=9?'0'+new Date().getHours():new Date().getHours();
			let min = new Date().getMinutes()<=9?'0'+new Date().getMinutes():new Date().getMinutes();
			let sec = new Date().getSeconds()<=9?'0'+new Date().getSeconds():new Date().getSeconds();
			return y + "-" + m + "-" + d + " " + hour + ":" + min;
    },
		getStart () {
			this.timeMark = 'start'
			this.$refs.picker.open()
		},
		getEnd () {
			this.timeMark = 'end'
			this.pickerVisible = new Date(new Date(this.pickerVisible).getTime() + 1 * 60 * 60 * 1000)
			this.$refs.picker.open()
		},
		formatDatetime(time) {
      if (time === "" || time === null) {
        return;
      } else {
        var y = new Date(time).getFullYear();
        var m =
          new Date(time).getMonth() + 1 <= 9
            ? "0" + (new Date(time).getMonth() + 1)
            : new Date(time).getMonth() + 1;
        var d = new Date(time).getDate()<= 9?'0'+new Date().getDate():new Date().getDate();
			let hour = new Date(time).getHours()<=9?'0'+new Date().getHours():new Date().getHours();
			let min = new Date(time).getMinutes()<=9?'0'+new Date().getMinutes():new Date().getMinutes();
			let sec = new Date(time).getSeconds()<=9?'0'+new Date().getSeconds():new Date().getSeconds();
        return y + "-" + m + "-" + d + " " + hour + ":" + min;
      }
		},
		formatEnd (time) {
			return time.getFullYear() + '-' + (time.getMonth() + 1 <= 9 ? '0'+time.getMonth() + 1:time.getMonth() + 1) + '-' + (time.getDate()<=9?'0'+time.getDate():time.getDate()) + ' ' + (time.getHours()<=9?'0'+time.getHours():time.getHours()) + ':' + (time.getMinutes()<=9?'0'+time.getMinutes():time.getMinutes())
		},
		closeTimePicker() {
			console.log(this.pickerVisible)
			if (this.timeMark === 'start') {
				this.startTime = this.formatDatetime(this.pickerVisible)
				let dateAfter = new Date(new Date(this.pickerVisible).getTime() + 1 * 60 * 60 * 1000)
				this.endTime = this.formatEnd(dateAfter)
			} else if (this.timeMark === 'end') {
				if (new Date(this.pickerVisible).getTime() < new Date(this.startTime).getTime()) {
					this.showRemind = true
					this.errorRemind = '结束时间不能小于开始时间'
					this.$refs.picker.open()
					setTimeout(()=>{
						this.showRemind = false
						this.errorRemind = ''
					},2000)
				} else {
					console.log(this.pickerVisible)
					this.endTime = this.formatDatetime(this.pickerVisible)
				}
			}
    },
		choiceLists (index) {
			if (this.idx !== index) {
				this.idx = index
			}
		},
		goTime () {
			this.$router.push('/RemindTime')
		}
	},
	created () {
		let dateAfter = new Date(new Date().getTime() + 1 * 60 * 60 * 1000)
		this.endTime = this.formatEnd(dateAfter)
	}
}
</script>

<style lang="less" scoped>
@import '../../assets/css/flex.less';
.add-day{
	.f-d-f;
	.f-fd-c;
	&-input {
		width:100%;
		.f-d-f;
		height:80px;
		input {
			.f-f-1;
			text-align: center;
			font-size:14px;
			color:#333;
			background: #efeff4;
		}
	}
	&-twoTime {
		padding: 0 10px;
		width:100%;
		.during {
			box-shadow: 3px 3px 3px #f3f3f3, 3px -3px 3px #f3f3f3,
				-3px 3px 3px #f3f3f3, -3px -3px 3px #f3f3f3;
				margin-top:10px;
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
						color:#999;
						font-size:12px;
					}
					p {
						color:#000;
						font-size:16px;
						margin:4px 0;
					}
				}
				&-hour {
					.f-d-f;
					.f-ai-c;
					.f-jc-c;
					hr {
						width:10px;
					}
					span {
						height:20px;
						padding:0 8px;
						line-height: 20px;
						text-align: center;
						font-size:12px;
						color:#333;
						border:1px solid #e5e5e5;
						border-radius: 10px;
					}
				}
		}
	}
	&-list {
		width:100%;
		ul {
			width:100%;
			.f-d-f;
			.f-fd-c;
			li {
				border-bottom:1px solid #e5e5e5;
				.w-l {
					height:60px;
					.f-d-f;
					.f-ai-c;
					padding:0 10px;
					.f-d-f;
					.f-jc-sb;
					.tit {
						font-size:14px;
						color:#333;
					}
					div {
						.f-d-f;
						p {
							.f-d-f;
							.f-ai-c;
							color:#333;
							font-size:12px;
							margin-left:20px;
							img {
								width:16px;
								margin-right:4px;
							}
						}
					}
					p {
						.f-d-f;
						.f-ai-c;
						img {
							width:26px;
						}
						span {
							color:#666;
							font-size:14px;
						}
						.arrow {
							width:10px;
							margin-left:10px;
						}
						.down {
							width:18px;
							margin-left:10px;
						}
						.ccColor {
							color:#999;
						}
						input {
							text-align: right;
						}
					}
				}
				.w-i {
					p{
						position: relative;
						width:40px;
						height:40px;
						img {
							width:100%;
							height:100%;
						}
						input {
							position: absolute;
							top:0;
							left:0;
							right:0;
							bottom:0;
							opacity: 0;
						}
					}
				}
			}
		}
	}
}
</style>
