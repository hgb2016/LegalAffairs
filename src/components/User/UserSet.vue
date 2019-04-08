<template>
  <div class="user-set">
		<div class="user-set-in">
      <div class="headerImg">
        <span>头像</span>
				<img :src="userInfo.headUrl" alt="">
      </div>
      <div @click="$router.push('/UserInput?title=姓名&content=李艳彪')">
        <span>我的姓名</span>
        <p>
          <span>{{userInfo.userName}}</span>
          <img src="../../assets/img/arrow.png" alt="">
        </p>
      </div>
			 <div @click="choiceSex">
        <span>性别</span>
        <p>
          <span>{{userInfo.hourRate}}</span>
          <img src="../../assets/img/arrow.png" alt="">
        </p>
      </div>
      <div @click="$router.push('/UserInput?title=公司&content=北京熙呈互动科技有限公司')">
        <span>公司</span>
        <p>
          <span>{{userInfo.company}}</span>
          <img src="../../assets/img/arrow.png" alt="">
        </p>
      </div>
      <div @click="$router.push('/UserInput?title=地址&content=十里河')">
        <span>地址</span>
        <p>
          <span>{{userInfo.address}}</span>
          <img src="../../assets/img/arrow.png" alt="">
        </p>
      </div>
			<div @click="$router.push('/UserInput?title=职务&content=前端开发工程师')">
        <span>职务</span>
        <p>
          <span>{{userInfo.duty}}</span>
          <img src="../../assets/img/arrow.png" alt="">
        </p>
      </div>
			<div @click="$router.push('/UserPhone')">
        <span>手机号</span>
        <p>
          <span>{{userInfo.mobilePhone}}</span>
          <img src="../../assets/img/arrow.png" alt="">
        </p>
      </div>
			<div @click="$router.push('/UserInput?title=邮箱&content=13513335747@163.com')">
        <span>邮箱</span>
        <p>
          <span>{{userInfo.email}}</span>
          <img src="../../assets/img/arrow.png" alt="">
        </p>
      </div>
			<div @click="$router.push('/UserInput?title=费率&content=5')">
        <span>小时费率(元/小时)</span>
        <p>
          <span>{{userInfo.hourRate}}</span>
          <img src="../../assets/img/arrow.png" alt="">
        </p>
      </div>
      <div @click="$router.push('/UserPwd')">
        <span>修改密码</span>
        <img src="../../assets/img/arrow.png" alt="">
      </div>
      <div>
        <span>退出登录</span>
      </div>
    </div>
    <transition name="fade">
      <div class="user-set-sex" v-if="showSex" @click.self="showSex=false">
        <div>
          <ul>
            <li v-for="(item,index) in sexLists" :key="index" @click="changeSex(item)">
              <span>{{item}}</span>
            </li>
          </ul>
          <p @click="showSex=false">取消</p>
        </div>
      </div>
    </transition>
	</div>
</template>

<script>
export default {
  data () {
    return {
      showSex:false,
      sexLists:[
        '男',
        '女'
      ],
    }
  },
  computed:{
    userInfo () {
      return this.$store.getters.getUserInfo
    }
  },
  methods:{
    choiceSex () {
      this.showSex = true
    },
    changeSex (val) {
      this.showSex = false
    }
  },
  created () {
    this.$store.dispatch('getUserInfo',{loginUserId: window.localStorage.getItem("loginUserId"),logintoken:window.localStorage.getItem("logintoken")})
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/flex.less';
.user-set{
	&-in{
    padding-top:38px;
    div{
      .f-d-f;
      .f-ai-c;
      .f-jc-sb;
      height:50px;
      border-bottom:1px solid #e5e5e5;
      padding:0 15px 0 20px;
      span{
        color:#333;
        font-size:14px;
        letter-spacing: 1px;
      }
      p {
        .f-d-f;
        .f-ai-c;
        .f-jc-c;
        span {
          color:#333;
          font-size:14px;
          letter-spacing: 1px;
        }
        img {
          margin-left:4px;
          width:8px;
        }
      }
      img {
        width:8px;
      }
    }
    div.headerImg{
      height:70px;
			img{
        width:40px;
        height:40px;
				border-radius: 50%;
			}
    }
  }
  &-sex {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    .f-d-f;
    .f-fd-cr;
    z-index: 1111;
    background-color: rgba(0, 0, 0, .2);
    div {
      width:100%;
      .f-d-f;
      .f-fd-c;
      .f-ai-c;
      ul{
        width:88%;
        background-color: #fff;
        border-radius: 8px;
        .f-d-f;
        .f-fd-c;
        li {
          height:40px;
          .f-d-f;
          .f-ai-c;
          .f-jc-c;
          span {
            font-size:14px;
            color:rgb(74, 74, 250);
          }
        }
        li+li {
          border-top:1px solid #e5e5e5;
        }
      }
      p {
         width:88%;
         background-color: #fff;
         border-radius: 8px;
         margin:10px 0;
         height:40px;
          .f-d-f;
          .f-ai-c;
          .f-jc-c;
          font-size:14px;
          color:rgb(74, 74, 250);
      }
    }
  }
}
</style>
