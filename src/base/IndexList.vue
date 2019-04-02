<template>
    <div class="index-list">
		<ul>
			<li v-for="(item,index) in infomationList" :key="index" @click="goDayDetails(item.scheduleId)" v-if="infomationList.length>0">
				<div class="list-time">
					<div>
						<span>{{item.beginTime.split(' ')[0]}}</span>
					</div>
					<div>
						<span>{{item.title}}</span>
						<span>{{item.beginTime.split(' ')[1]}}-{{item.endTime.split(' ')[1]}}</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  props: ["infomationList"],
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
      border-bottom: 1px solid #e5e5e5;
      .list-time {
        .f-d-f;
        .f-fd-c;
        padding: 10px 20px;
        div {
          span {
            color: #333;
            font-size: 14px;
          }
        }
        div + div {
          .f-d-f;
          .f-fd-c;
          margin-top: 10px;
          span {
            color: #999;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
