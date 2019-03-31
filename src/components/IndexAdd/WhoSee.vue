<template>
<div class="who-see">
    <ul>
			<li v-for="(item,index) in firendLists" :key="index">
				<div>
					<img :src="item.userimg" alt="">
					<span>{{item.name}}</span>
					<img class="see-del" src="../../assets/img/icon_dele.png" alt="">
				</div>
			</li>
		</ul>
</div>
</template>

<script>
import liyan from "@/assets/img/liyan.jpg";

export default {
  data() {
    return {
      firendLists: [
        {
          id: 1,
          name: "李艳彪1",
          userimg: liyan
        },
        {
          id: 2,
          name: "李艳彪2",
          userimg: liyan
        },
        {
          id: 3,
          name: "李艳彪3",
          userimg: liyan
        },
        {
          id: 4,
          name: "李艳彪4",
          userimg: liyan
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex.less";
.who-see {
  ul {
    width: 100%;
    .f-d-f;
    .f-fd-c;
    li {
      height: 50px;
      .f-d-f;
      .f-ai-c;
      .f-jc-sb;
      padding: 0 10px;
      border-bottom: 1px solid #e5e5e5;
      div {
        .f-d-f;
        .f-ai-c;
        .f-f-1;
				position: relative;
        img {
          width: 36px;
          margin-left: 4px;
        }
        span {
          font-size: 14px;
          color: #333;
          margin-left: 4px;
				}
				.see-del {
					position: absolute;
					top:50%;
					transform: translateY(-50%);
					width:18px;
					right:4px;
				}
      }
      img {
        width: 12px;
      }
    }
  }
}
</style>
