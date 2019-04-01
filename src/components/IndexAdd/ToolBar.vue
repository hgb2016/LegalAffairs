<template>
  <div class="tool-bar">
    <!-- <div class="tool-bar-fix">
			<span class="left">我的常用</span>
			<div>
				<p v-for="(item,index) in topTitle" :key="index">
					<img :src="item.img" alt="">
					<span>{{item.name}}</span>
					<i v-if="showI" @click="deleteIcon(index)"></i>
				</p>
			</div>
			<img class="right" @click="updateIcon" src="../../assets/img/icon_edit.png" alt="">
    </div>-->
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
import HTTP from "../../assets/js/postHttp.js";
import * as API from "../../assets/js/api.js";

export default {
  data() {
    return {
        findList:[],
        countList:[],
        laborList:[]
    };
  },
  created() {
    this.loginUserId = window.localStorage.getItem("loginUserId");
    this.logintoken = window.localStorage.getItem("logintoken");
    this.getAllTool();
  },
  methods: {
    updateIcon() {
      this.showI = true;
    },
    deleteIcon(index) {
      this.topTitle.splice(index, 1);
    },
    async getAllTool() {
      const { data } = await HTTP.post("/Index/getAllTool", {
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
        i {
          position: absolute;
          width: 16px;
          height: 16px;
          display: block;
          top: 0;
          right: 0;
          background: url("../../assets/img/icon_dele.png");
          background-size: 100%;
        }
      }
        
    }
  }
  &-list {
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
      div {
        .f-d-f;
        .f-fw-w;
        padding-bottom: 20px;
        p {
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
          img {
            width: 36px;
          }
        }
      }
    }
  }
}
</style>
