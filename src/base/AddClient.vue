<template>
  <div class="addproject" :style="rightTransition" @click.self="closeSale">
    <div class="addproject-sale">
      <div class="addproject-sale-header">
        <p></p>
        <h4>我的客户</h4>
        <p style="color:#0c7dff" @click="closeSale">确定</p>
      </div>

      <div class="addproject-sale-search">
        <input v-model="clientKey" type="text" placeholder="请输入客户关键字">
        <i></i>
      </div>
      <ul>
        <li
          v-for="(item,index) in searchData"
          :key="index"
          @click="choiceClient(item.clientName,item.clientId)"
        >
          <span v-if="item.clientId !== proId">{{item.clientName}}</span>
          <span v-if="item.clientId === proId" style="color:#2B6FCE">{{item.clientName}}</span>
          <template v-if="item.clientId !== proId">
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
    showClient: {
      type: Boolean
    },
    clientLists: {
      tpe: Array
    },
    clientId: {
      type: String
    }
  },
  data() {
    return {
      right: -100,
      productValue: "",
      proName: "",
      proId: "",
      clientKey: ""
    };
  },
  computed: {
    rightTransition() {
      return {
        right: `${this.right}%`
      };
    },
    searchData: function() {
      var keyword = this.clientKey;
      if (keyword) {
        return this.clientLists.filter(function(o) {
          return Object.keys(o).some(function(key) {
            return (
              String(o[key])
                .toLowerCase()
                .indexOf(keyword) > -1
            );
          });
        });
      }
      return this.clientLists;
    }
  },
  methods: {
    choiceClient(name, id) {
      if (this.proId !== id) {
        this.proName = name;
        this.proId = id;
      } else {
        this.proName = "";
        this.proId = "";
      }
    },
    goAddPro() {
      this.$router.push("/AddPro");
    },
    closeSale() {
      let newObj = {};
      newObj["name"] = this.proName;
      newObj["id"] = this.proId;
      this.$emit("close_Sale", newObj);
    }
  },
  watch: {
    showClient(val) {
      if (val === true) {
        this.right = 0;
      } else {
        this.right = -100;
      }
    },
    clientId: {
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
  width: 100vw;
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
    height: 100vh;
    background-color: #fff;
    position: relative;
    overflow-y: scroll;
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
    &-search {
      margin: 50px 20px 10px;
      height: 30px;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      background-color: #fff;
      .f-d-f;
      .f-jc-sb;
      .f-ai-c;
      padding: 0 10px;
      i {
        background-image: url("../assets/img/icon_search.png");
        width: 26px;
        height: 26px;
        background-size: 100% 100%;
      }
      input {
        width: 100%;
        font-size: 12px;
        color: #333;
      }
    }
    ul {
      .f-d-f;
      .f-fd-c;
      padding-bottom: 38px;
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
