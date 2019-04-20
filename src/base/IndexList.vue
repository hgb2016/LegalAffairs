<template>
    <div class="index-list">
		<ul>
			<li v-if="infomationList.length>0">
        <template v-if="mark===true">
          <div class="list-time">
            <div>
              <span>{{infomationList[0].beginTime | NowDate}}</span>
            </div>
            <div class="secondDiv" v-for="(item,index) in infomationList" :key="index" @click="goDayDetails(item.scheduleId)">
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
          <div class="bot-yx">
            <span></span>
            <p>优秀是一种习惯</p>
            <span></span>
          </div>
        </template>
        <template v-else>
          <div class="list-time" v-for="(item,index) in infomationList" :key="index" @click="goDayDetails(item.scheduleId)">
            <div>
              <span>{{item.beginTime.split(' ')[0]}} - {{item.endTime.split(' ')[0]}}</span>
            </div>
            <div>
              <template v-if="item.markTime === false">
                <span style="font-weight:bold;">{{item.title}}</span>
                <span>{{item.beginTime.split(' ')[1]}} - {{item.endTime.split(' ')[1]}}</span>
              </template>
              <template v-else>
                <span style="color:#888">{{item.title}}</span>
                <span style="color:#999">{{item.beginTime.split(' ')[1]}} - {{item.endTime.split(' ')[1]}}</span>
              </template>
            </div>
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
      console.log(time)
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
        return time.split(' ')[0].split('-')[1]+'-'+ time.split(' ')[0].split('-')[2] + ' '+time.split(' ')[1]
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
  margin-top: 10px;
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
        padding-top: 10px;
        div {
          .f-d-f;
          .f-fd-c;
          span {
            color: #666;
            font-size: 12px;
            margin-top: 5px;
          }
        }
        .secondDiv {
          .f-d-f;
          .f-fd-c;
          margin-top: 6px;
          border-bottom: 1px solid #e5e5e5;
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
