<template>
  <div class="tool-bar">
		<div class="tool-bar-fix">
			<span class="left">我的常用</span>
			<div>
				<p v-for="(item,index) in topTitle" :key="index">
					<img :src="item.img" alt="">
					<span>{{item.name}}</span>
					<i v-if="showI" @click="deleteIcon(index)"></i>
				</p>
			</div>
			<img class="right" @click="updateIcon" src="../../assets/img/icon_edit.png" alt="">
		</div>
		<div class="tool-bar-list">
			<div class="items">
				<h4>查询</h4>
				<div>
					<p>
						<img src="../../assets/img/icon_gs.png" alt="">
						<span>工商查询</span>
					</p>
					<p>
						<img src="../../assets/img/jianding.png" alt="">
						<span>鉴定机构</span>
					</p>
					<p>
						<img src="../../assets/img/fayuan.png" alt="">
						<span>法院查询</span>
					</p>
					<p>
						<img src="../../assets/img/hetongmoban.png" alt="">
						<span>合同模板</span>
					</p>
					<p>
						<img src="../../assets/img/zhongcaiwei.png" alt="">
						<span>仲裁委查询</span>
					</p>
				</div>
			</div>
			<div class="items">
				<h4>计算</h4>
				<div>
					<p>
						<img src="../../assets/img/lvshifei.png" alt="">
						<span>律师费计算</span>
					</p>
					<p>
						<img src="../../assets/img/icon_ssf.png" alt="">
						<span>诉讼费计算</span>
					</p>
					<p>
						<img src="../../assets/img/zhongcaifei.png" alt="">
						<span>仲裁费计算</span>
					</p>
					<p>
						<img src="../../assets/img/weiyuejin.png" alt="">
						<span>违约金计算</span>
					</p>
					<p>
						<img src="../../assets/img/tianshuriqi.png" alt="">
						<span>天数日期计算</span>
					</p>
					<p>
						<img src="../../assets/img/touziguquan.png" alt="">
						<span>投诉股权计算</span>
					</p>
					<p>
						<img src="../../assets/img/jiaotongbuchangjin.png" alt="">
						<span>交通补偿金</span>
					</p>
				</div>
			</div>
			<div class="items">
				<h4>劳动类</h4>
				<div>
					<p>
						<img src="../../assets/img/geshui.png" alt="">
						<span>个税计算</span>
					</p>
					<p>
						<img src="../../assets/img/lizhi.png" alt="">
						<span>离职补偿金</span>
					</p>
					<p>
						<img src="../../assets/img/chanjia.png" alt="">
						<span>产假计算</span>
					</p>
					<p>
						<img src="../../assets/img/gongshang.png" alt="">
						<span>工伤赔偿</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import icon_ssf from '@/assets/img/icon_ssf.png'
import icon_gs from '@/assets/img/icon_gs.png'
import lvshifei from '@/assets/img/lvshifei.png'
export default {
	data () {
		return {
			topTitle:[
				{
					id:1,
					img:icon_ssf,
					name:'诉讼费计算'
				},
				{
					id:2,
					img:icon_gs,
					name:'工商查询'
				},
				{
					id:3,
					img:lvshifei,
					name:'律师费计算'
				},
			],
			showI:false
		}
	},
	methods:{
		updateIcon () {
			this.showI = true
		},
		deleteIcon (index) {
			this.topTitle.splice(index,1)
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
    top: 0;
    height: 90px;
    padding: 0 10px;
    .f-d-f;
    .f-ai-c;
    .left {
      font-size: 14px;
      color: #333;
    }
    img {
      width: 24px;
    }
    div {
      .f-d-f;
      .f-f-1;
      p {
        .f-f-1;
        .f-d-f;
        .f-fd-c;
				.f-ai-c;
				position: relative;
        span {
          font-size: 12px;
          color: #333;
          margin-top: 4px;
        }
        img {
          width: 36px;
				}
				i{
					position: absolute;
					width:16px;
					height:16px;
					display: block;
					top:0;
					right:0;
					background:url('../../assets/img/icon_dele.png');
					background-size: 100%;
				}
      }
    }
	}
	&-list {
		padding-top:90px;
		.f-d-f;
		.f-fd-c;
		.items {
			.f-d-f;
			.f-fd-c;
			h4 {
				line-height: 30px;
				padding-left:10px;
				font-size:14px;
				color:#333;
				background-color: #efeff4;
			}
			div {
				.f-d-f;
				.f-fw-w;
				padding-bottom:20px;
				p {
					width:25%;
					.f-d-f;
					.f-fd-c;
					.f-ai-c;
					margin-top:20px;
					span {
						font-size: 12px;
						color: #333;
						margin-top: 4px;
					}
					img {
						width: 36px;
					}
				}
			}
		}
	}
}
</style>
