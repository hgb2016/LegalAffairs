<template>
  <div class="tab">
    <ul>
      <template v-for = "navbar in navbars" >
        <li :key="navbar.id"  @click="clickNavbar(navbar.url)">
          <div v-if="navbar.url===navName">
            <img :src="navbar.clickImg" alt="">
            <p style="color:#FE5A5A">{{navbar.name}}</p>
          </div>
          <div v-else>
            <img :src="navbar.img" alt="">
            <p>{{navbar.name}}</p>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<style lang="less" scoped>
@import '../assets/css/flex.less';
.tab{
  position:fixed;
  z-index:99;
  bottom:0;
  left:0;
  width: 100%;
  height: 60px;
  background:#fff;
  ul {
    overflow: hidden;
    height:100%;
    .f-d-f;
    li{
      .f-f-1;  
      height:100%;
      border-top:1px solid #e5e5e5;
      position: relative;
      div{
        .f-d-f;
        .f-ai-c;
        .f-jc-c;
        .f-fd-c;
        color:#101010;
        height:100%;
        p{
          font-size:12px;
          color:#666;
          margin-top: 3px;
        }
        img{
          width: 18px;
          height: 18px;
        }
      }
      div.typeface{
        opacity: .5;
      }
      .noread{
        position: absolute;
        right:24%;
        top:4px;
        width:20px;
        height:20px;
        border-radius: 50%;
        background-color: red;
        .f-d-f;
        .f-ai-c;
        .f-jc-c;
        font-size:.75rem;
        color:#fff;
      }
    }
  }
}
</style>
<script>
import index from '@/assets/img/index.png'
import index1 from '@/assets/img/index1.png'
import day from '@/assets/img/day.png'
import day1 from '@/assets/img/day1.png'
import project from '@/assets/img/project.png'
import project1 from '@/assets/img/project1.png'
import MailList from '@/assets/img/MailList.png'
import MailList1 from '@/assets/img/MailList1.png'
export default {
  props: [
    'navName',
  ],
  data () {
    return {
      navbars: [
        {
          img: index,
          clickImg: index1,
          name: '首页',
          url: '/',
          english: 'Index'
        },
        {
          img: day,
          clickImg: day1,
          name: '日程',
          url: '/Day',
          english: 'Day'
        },
        {
          img: project,
          clickImg: project1,
          name: '项目',
          url: '/Project',
          english: 'Project'
        },
        {
          img: MailList,
          clickImg: MailList1,
          name: '通讯录',
          url: '/MailList',
          english: 'MailList'
        }
      ],
      showColor: false,
    }
  },
  methods: {
    clickNavbar (url) {
      this.$router.push(url)
    }
	}
}
</script>
