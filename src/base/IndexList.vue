<template>
    <div class="index-list">
		<ul>
			<li>
        <template v-if="mark===true">
          <div class="list-time">
            <div>
              <span>{{infomationList[0].beginTime.split(' ')[0]}}</span>
            </div>
            <div v-for="(item,index) in infomationList" :key="index" @click="goDayDetails(item.scheduleId)">
              <template v-if="item.markTime === false">
                <span>{{item.title}}</span>
                <span>{{item.beginTime.split(' ')[1]}}-{{item.endTime.split(' ')[1]}}</span>
              </template>
              <template v-else>
                <span style="color:#888">{{item.title}}</span>
                <span style="color:#999">{{item.beginTime.split(' ')[1]}}-{{item.endTime.split(' ')[1]}}</span>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="list-time" v-for="(item,index) in infomationList" :key="index" @click="goDayDetails(item.scheduleId)">
            <div>
              <span>{{item.beginTime.split(' ')[0]}}</span>
            </div>
            <div>
              <template v-if="item.markTime === false">
                <span>{{item.title}}</span>
                <span>{{item.beginTime.split(' ')[1]}}-{{item.endTime.split(' ')[1]}}</span>
              </template>
              <template v-else>
                <span style="color:#888">{{item.title}}</span>
                <span style="color:#999">{{item.beginTime.split(' ')[1]}}-{{item.endTime.split(' ')[1]}}</span>
              </template>
            </div>
          </div>
        </template>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  props: ["infomationList",'mark'],
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
  border-top:1px solid #e5e5e5;
  ul {
    width: 100%;
    .f-d-f;
    .f-fd-c;
    li {
      border-bottom: 1px solid #e5e5e5;
      .list-time {
        .f-d-f;
        .f-fd-c;
        padding: 10px 20px;
        div {
          span {
            color: #333;
            font-size: 12px;
          }
        }
        div + div {
          .f-d-f;
          .f-fd-c;
          margin-top: 6px;
          span {
            color: #333;
            font-size: 12px;
          }
          span + span {
            color:#666;
          }
        }
      }
    }
  }
}
</style>
