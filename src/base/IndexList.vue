<template>
    <div class="index-list">
		<ul>
			<li v-if="infomationList.length>0">
        <template v-if="mark===true">
          <div class="list-time">
            <div class="list-time-nav">
              <span>{{infomationList[0].beginTime | NowDate}}</span>
            </div>
            <div class="list-time-bot" v-for="(item,index) in infomationList" :key="index">
              <div class="bot-left">
                <p></p>
                <span></span>
                <p class="x"></p>
              </div>
              <div class="bot-right" @click="goDayDetails(item.scheduleId)">
                <template v-if="item.markTime === false">
                  <span style="color:#000">{{item.title}}</span>
                  <span style="color:#999">{{item.beginTime | FormatDate }} - {{item.endTime | FormatDate}}</span>
                </template>
                <template v-else>
                  <span style="color:#D9D9D9">{{item.title}}</span>
                  <span style="color:#D9D9D9">{{item.beginTime | FormatDate }} - {{item.endTime | FormatDate}}</span>
                </template>
              </div>
            </div>
          </div>
          <div class="bot-yx">
            <span></span>
            <p>优秀是一种习惯</p>
            <span></span>
          </div>
        </template>
			</li>
      <li v-if="infomationList.length===0" class="nullArray">
        <img src="../assets/img/3.png" alt="">
      </li>
		</ul>
	</div>
</template>

<script>
export default {
  props: ["infomationList",'mark'],
  filters:{
    FormatDate(time) {
      let y = new Date().getFullYear();
      let m =
        new Date().getMonth() + 1 <= 9
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      let d =
        new Date().getDate() <= 9
          ? "0" + new Date().getDate()
          : new Date().getDate();
      let newString = y+'-'+m+'-'+d 
      if (time.split(' ')[0] === newString) {
        return time.split(' ')[1]
      } else {
        return time.split(' ')[1]
      }
    },
    NowDate(time) {
      let y = new Date().getFullYear();
      let m =
        new Date().getMonth() + 1 <= 9
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      let d =
        new Date().getDate() <= 9
          ? "0" + new Date().getDate()
          : new Date().getDate();
      let newString = y+'-'+m+'-'+d 
      if (time.split(' ')[0] === newString) {
        return '今天'
      } else {
        return time.split(' ')[0]
      }
    }
  },
  methods:{
    goDayDetails (id) {
      this.$router.push(`/DayDetails?id=${id}`)
    },
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/flex.less";
.index-list {
  width: 100%;
  ul {
    width: 100%;
    .f-d-f;
    .f-fd-c;
    li {
      margin-left: 20px;
      margin-right: 20px;
      .list-time {
        .f-d-f;
        .f-fd-c;
        .f-f-1;
        padding-top: 10px;
        .list-time-nav {
          .f-d-f;
          .f-fd-c;
          margin-bottom:8px;
          span {
            color: #666;
            font-size: 12px;
            margin-top: 5px;
          }
        }
        .list-time-bot{
          .f-d-f;
          .bot-left{
            width:4px;
            .f-d-f;
            .f-ai-c;
            .f-jc-c;
            margin-right:10px;
            .f-fd-c;
            span {
              width:2px;
              height:2px;
              background-color:red;
              margin:4px 0;
            }
            p {
              width:1px;
              height:10px;
              background-color: #999;
            }
            .x {
              .f-f-1;
            }
          }
          .bot-right {
            .f-d-f;
            .f-fd-c;
            .f-f-1;
            margin-top: 6px;
            border-bottom: 1px solid #f6f5f5;
            padding-bottom: 4px;
            span {
              color: #000;
              font-size: 12px;
            }
            span + span {
              color:#333;
            }
          }
        }
      }
      .bot-yx {
        .f-d-f;
        padding:10px 10px;
        justify-content: center;
        align-items: center;
        span {
          padding:0 10px;
          width:80px;
          height:1px;
          background-color: rgb(217, 217, 217);

        }
        p {
          font-size:12px;
          color:#999;
          flex:1;
          text-align: center;
        }
      }
    }
    .nullArray {
      img {
        width:100%;
      }
    }
  }
}
</style>
