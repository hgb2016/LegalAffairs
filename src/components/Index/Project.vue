<template>
  <div class="Project">
    <div class="Project-header">
      <div class="Project-header-search">
        <input type="text" placeholder="请输入项目名称">
        <i></i>
      </div>
      <!-- 案件列表-->
      <div class="Project-list">
        <div class="Project-list-item">
          <div class="Project-list-item-r">
            <p>法律机器人平板项目</p>
            <span>
              <p>洽谈中</p>
              <i></i>
            </span>
          </div>
          <div class="Project-list-childItem">
            
            <div>
              <img src="../../assets/img/niu.png" alt>
              <p>阿彪</p>
              <p>2019-01-23 07:00 - 08:00</p>
            </div>
            <h5>完成第一阶段任务</h5>
            <p>1.00小时</p>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.Project {
  width: 100%;
  &-header {
    margin-top: 60px;
    background: #fff;
    position: fixed;
    top: 0px;
    width: 100%;
    &-search {
      margin: 0px 20px 10px;
      .f-f-1;
      .f-d-f;
      height: 30px;
      border: 1px solid #e5e5e5;
      border-radius: 30px;
      background-color: #fff;
      .f-d-f;
      .f-jc-sb;
      .f-ai-c;
      padding: 0 10px;
      i {
        background-image: url("../../assets/img/icon_search.png");
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
  }
  &-list {
    width: 100%;
    &-item {
      &-r {
        border-bottom: 1px solid #ededed;
        font-size: 14px;
        padding: 8px 20px;
        .f-d-f;
        .f-fd-r;
        .f-jc-sb;
        .f-ai-c;
        span {
          .f-d-f;
          .f-fd-r;
          .f-ai-c;
          font-size: 12px;
          p {
            color: #fff;
            border-radius: 4px;
            background-color: #4fc15f;
            padding: 3px 20px;
          }
          i {
            margin-left: 10px;
            background-image: url("../../assets/img/up_black.png");
            width: 13px;
            height: 7.5px;
            background-size: 100% 100%;
          }
        }
      }
    }
    &-childItem {
      .f-d-f;
      .f-fd-c;
      font-size: 14px;
      padding: 10px 20px 10px 30px;
      div {
        .f-d-f;
        .f-fd-r;
        .f-ai-c;
        img {
          border-radius: 50%;
          height: 20px;
          width: 20px;
        }
        p {
          margin-top: 0px;
          color: #333;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      h5{
          font-weight: bold;
          margin-top: 5px;
          margin-left: 30px;
      }
      p{
          color: #0c7dff;
           margin-top: 5px;
          font-size: 12px;
          margin-left: 30px;
      }
      span{
          margin-top: 10px;
          height: 0.5px;
          background-color: #ededed;
          margin-left: 30px;
      }
    }
  }
}
</style>
