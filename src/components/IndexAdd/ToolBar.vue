<template>
  <div class="tool-bar">
    <!-- <div class="tool-bar-fix">
			<span class="left">我的常用</span>
			<div class="left-b">
				<div v-for="(item,index) in toolList" :key="index">
					<p>
						<img :src="item.actionNewPic" alt="">
						<i v-if="showI" @click="deleteIcon(index)"></i>
					</p>
					<span>{{item.actionName}}</span>
				</div>
			</div>
			<img class="right" @click="updateIcon" src="../../assets/img/icon_edit.png" alt="">
    </div> -->
    <div class="tool-bar-list">
      <div class="items">
        <h4>查询</h4>
        <div>
          <p v-for="(item, index) in findList" :key="index">
            <a :href="item.url">
            	<img :src="item.actionNewPic" alt>
            </a>
            <span>{{item.actionName}}</span>
          </p>
        </div>
      </div>
      <div class="items">
        <h4>计算</h4>
       <div>
          <p v-for="(item, index) in countList" :key="index">
            <a :href="item.url">
            	<img :src="item.actionNewPic" alt>
						</a>
            <span>{{item.actionName}}</span>
          </p>
        </div>
      </div>
      <div class="items">
        <h4>劳动类</h4>
      	<div>
          <p v-for="(item, index) in laborList" :key="index">
            <a :href="item.url">
            	<img :src="item.actionNewPic" alt>
						</a>
            <span>{{item.actionName}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icon_ssf from "@/assets/img/icon_ssf.png";
import icon_gs from "@/assets/img/icon_gs.png";
import lvshifei from "@/assets/img/lvshifei.png";
import postHttp from "../../assets/js/postHttp.js";

export default {
  data() {
    return {
        findList:[],
        countList:[],
        laborList:[],
        toolList:[],
        showI:false
    };
  },
  created() {
    this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
    this.getAllTool();
    this.getHotTool();
  },
  methods: {
    updateIcon() {
      this.showI = !this.showI;
    },
    deleteIcon(index) {
      this.topTitle.splice(index, 1);
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
    async getAllTool() {
      const { data } = await postHttp.post("/Index/getAllTool", {
        loginUserId: this.loginUserId,
        logintoken: this.logintoken
      });
      if (!data.error) {
        this.findList = data.data.findList;
        this.countList = data.data.countList;
        this.laborList = data.data.laborList;
      } else {
        alert(data.message);
      }
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
    .f-d-f;
    .f-fd-c;
    padding-top:38px;
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
			div {
				padding-bottom:20px;
				width:100%;
				.f-d-f;
				.f-fw-w;
				p {
					width: 25%;
					.f-d-f;
					.f-fd-c;
					.f-ai-c;
					margin-top:20px;
					a {
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
					span {
						font-size: 12px;
						color: #333;
						margin-top: 4px;
					}
				}
      }
    }
  }
}
</style>
