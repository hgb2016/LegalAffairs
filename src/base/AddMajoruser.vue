<template>
  <div class="addproject" :style="rightTransition" @click.self="closeSale">
    <div class="addproject-sale">
      <div class="addproject-sale-header">
        <p></p>
        <h4>选择主要负责人</h4>
        <p style="color:#0c7dff" @click="closeSale">确定</p>
      </div>
      <ul>
        <li
          v-for="(item,index) in userLists"
          :key="index"
          @click="choiceMajor(item.userName,item.userId)"
        >
          <span v-if="item.userId !== proId">{{item.userName}}</span>
          <span v-if="item.userId === proId" style="color:#2B6FCE">{{item.userName}}</span>
          <template v-if="item.userId !== proId">
            <img src="../assets/img/icon_checkempty.png" alt>
          </template>
          <template v-else>
            <img src="../assets/img/check_green.png" alt>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import icon_checkempty from "@/assets/img/icon_checkempty.png";
import check_green from "@/assets/img/check_green.png";
export default {
  components: {},
  props: {
    showMajorUser: {
      type: Boolean
    },
    userLists: {
      tpe: Array
    },
    userId: {
      type: String
    }
  },
  data() {
    return {
      right: -100,
      productValue: "",
      proName: "",
      proId: ""
    };
  },
  computed: {
    rightTransition() {
      return {
        right: `${this.right}%`
      };
    }
  },
  methods: {
    choiceMajor(name, id) {
      if (this.proId !== id) {
        this.proName = name;
        this.proId = id;
      } else {
        this.proName = "";
        this.proId = "";
      }
    },

    closeSale() {
      let newObj = {};
      newObj["name"] = this.proName;
      newObj["id"] = this.proId;
      this.$emit("close_Sale", newObj);
    }
  },
  watch: {
    showMajorUser(val) {
      if (val === true) {
        this.right = 0;
      } else {
        this.right = -100;
      }
    },
    userId: {
      handler(val) {
        this.proId = val;
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/flex.less";
.addproject {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  right: -100%;
  transition: right 0.2s;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  overflow: hidden;
  .f-d-f;
  .f-fd-rr;
  &-sale {
    width: 80%;
    height: 100%;
    background-color: #fff;
    overflow-y: scroll;
    .f-d-f;
    .f-fd-c;
    position: relative;
   
    &-header {
      background-color: #fff;
      width: 80%;
      position: fixed;
      top: 0px;
      border-bottom: 1px solid #ededed;
      padding: 10px 15px;
      .f-d-f;
      .f-fd-r;
      .f-ai-c;
      .f-jc-sb;
      p {
        font-size: 15px;
      }
    }
    ul {
      .f-d-f;
      .f-fd-c;
       padding: 0px 0 38px;
      li {
        height: 60px;
        border-top: 1px solid #e5e5e5;
        .f-d-f;
        .f-ai-c;
        .f-jc-sb;
        padding: 0 14px;
        span {
          font-size: 14px;
          color: 3333;
        }
        img {
          width: 14px;
        }
      }
      li:last-child {
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
}
</style>
