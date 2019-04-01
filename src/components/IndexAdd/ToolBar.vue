<template>
  <div class="tool-bar">
		<div class="tool-bar-fix">
			<span class="left">我的常用</span>
			<div class="left-b">
				<div v-for="(item,index) in topTitle" :key="index">
					<p>
						<img :src="item.img" alt="">
						<i v-if="showI" @click="deleteIcon(index)"></i>
					</p>
					<span>{{item.name}}</span>
				</div>
			</div>
			<img class="right" @click="updateIcon" src="../../assets/img/icon_edit.png" alt="">
		</div>
		<div class="tool-bar-list">
			<div class="items">
				<h4>查询</h4>
				<div class="items-p">
					<div v-for="(item,index) in searchLists" :key=index>
						<p>
							<img :src="item.img" alt="">
							<i v-if="showI" :class="{'ichecked':item.status}" @click="choiceed(index)"></i>
						</p>
						<span>{{item.name}}</span>
					</div>
				</div>
			</div>
			<div class="items">
				<h4>计算</h4>
				<div class="items-p">
					<div>
						<p>
							<img src="../../assets/img/lvshifei.png" alt="">
							<i></i>
						</p>
						<span>律师费计算</span>
					</div>
					<div>
						<p>
							<img src="../../assets/img/icon_ssf.png" alt="">
							<i></i>
						</p>
						<span>诉讼费计算</span>
					</div>
					<div>
						<p>
							<img src="../../assets/img/zhongcaifei.png" alt="">
							<i></i>
						</p>
						<span>仲裁费计算</span>
					</div>
					<div>
						<p>
							<img src="../../assets/img/weiyuejin.png" alt="">
							<i></i>
						</p>
						<span>违约金计算</span>
					</div>
					<div>
						<p>
							<img src="../../assets/img/tianshuriqi.png" alt="">
							<i></i>
						</p>
						<span>天数日期计算</span>
					</div>
					<div>
						<p>
							<img src="../../assets/img/touziguquan.png" alt="">
							<i></i>
						</p>
						<span>投诉股权计算</span>
					</div>
					<div>
						<p>
							<img src="../../assets/img/jiaotongbuchangjin.png" alt="">
							<i></i>
						</p>
						<span>交通补偿金</span>
					</div>
				</div>
			</div>
			<div class="items">
				<h4>劳动类</h4>
				<div class="items-p">
					<div>
						<p>
							<img src="../../assets/img/geshui.png" alt="">
							<i></i>
						</p>
						<span>个税计算</span>
					</div>
					<div>
						<p>
							<img src="../../assets/img/lizhi.png" alt="">
							<i></i>
						</p>
						<span>离职补偿金</span>
					</div>
					<div>
						<p>
							<img src="../../assets/img/chanjia.png" alt="">
							<i></i>
						</p>
						<span>产假计算</span>
					</div>
					<div>
						<p>
							<img src="../../assets/img/gongshang.png" alt="">
							<i></i>
						</p>
						<span>工伤赔偿</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import icon_ssf from "@/assets/img/icon_ssf.png";
import icon_gs from "@/assets/img/icon_gs.png";
import lvshifei from "@/assets/img/lvshifei.png";
// 未被选中
import icon_checkempty from "@/assets/img/icon_checkempty.png";
// 选中
import icon_checkbox from "@/assets/img/icon_checkbox.png";
import jianding from "@/assets/img/jianding.png";
import fayuan from "@/assets/img/fayuan.png";
import hetongmoban from "@/assets/img/hetongmoban.png";
import zhongcaiwei from "@/assets/img/zhongcaiwei.png";
export default {
  data() {
    return {
      topTitle: [
        {
          id: 1,
          img: icon_ssf,
          name: "诉讼费计算"
        },
        {
          id: 2,
          img: icon_gs,
          name: "工商查询"
        },
        {
          id: 3,
          img: lvshifei,
          name: "律师费计算"
        }
			],
			searchLists:[
				{
					name:'工商查询',
					img:icon_gs,
					status:false
				},
				{
					name:'鉴定机构',
					img:jianding,
					status:false
				},
				{
					name:'法院查询',
					img:fayuan,
					status:false
				},
				{
					name:'合同模板',
					img:hetongmoban,
					status:false
				},
				{
					name:'仲裁委查询',
					img:zhongcaiwei,
					status:false
				},
			],
			calLists:[
				{
					name:'',
					img:,
					status:false
				}
			],
      showI: false
    };
  },
  methods: {
    updateIcon() {
      this.showI = !this.showI;
    },
    deleteIcon(index) {
      this.topTitle.splice(index, 1);
		},
		choiceed (idx) {
			this.searchLists.forEach((v,index)=>{
				if (index === idx) {
					if (v.status === true) {
						v.status = false
					} else {
						v.status = true
					}
				}
			})
		}
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.tool-bar {
  &-fix {
    position: fixed;
    left: 0;
    right: 0;
    top: 38px;
    height: 90px;
    padding: 0 10px;
    .f-d-f;
    .f-ai-c;
    background-color: #fff;
    .left {
      font-size: 14px;
      color: #333;
    }
    img {
      width: 24px;
    }
    .left-b {
      .f-d-f;
      .f-f-1;
      div {
        .f-f-1;
        .f-d-f;
        .f-fd-c;
        .f-ai-c;
        span {
          font-size: 12px;
          color: #333;
          margin-top: 4px;
        }
        p {
          position: relative;
          img {
            width: 36px;
          }
          i {
            position: absolute;
            width: 16px;
            height: 16px;
            display: block;
            top: -10px;
            right: -10px;
            background: url("../../assets/img/icon_dele.png");
            background-size: 100%;
          }
        }
      }
    }
  }
  &-list {
    padding-top: 90px;
    .f-d-f;
    .f-fd-c;
    .items {
      .f-d-f;
      .f-fd-c;
      h4 {
        line-height: 30px;
        padding-left: 10px;
        font-size: 14px;
        color: #333;
        background-color: #efeff4;
      }
      .items-p {
        .f-d-f;
        .f-fw-w;
        padding-bottom: 20px;
        div {
          width: 25%;
          .f-d-f;
          .f-fd-c;
          .f-ai-c;
          margin-top: 20px;
          span {
            font-size: 12px;
            color: #333;
            margin-top: 4px;
          }
          p {
						position: relative;
            img {
              width: 36px;
						}
						i {
							display: block;
							background: url('../../assets/img/icon_checkempty.png') no-repeat;
							background-size: 100% 100%;
							width:14px;
							height:14px;
							position: absolute;
							right:-10px;
							top:-10px;
						}
						.ichecked {
							background: url('../../assets/img/icon_checkbox.png') no-repeat; 
							background-size: 100% 100%;
						}
          }
        }
      }
    }
  }
}
</style>
