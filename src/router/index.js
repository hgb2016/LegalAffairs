import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index'
import Day from '@/components/Index/Day'
import MailList from '@/components/Index/MailList'
import Project from '@/components/Index/Project'
import User from '@/components/User/User'
import UserSet from '@/components/User/UserSet'
import UserInput from '@/components/User/UserInput'
import UserPhone from '@/components/User/UserPhone'
import UserPwd from '@/components/User/UserPwd'
import MyCustomer from '@/components/UserList/MyCustomer'
import AddCustomer from '@/components/UserList/AddCustomer'
import AddDay from '@/components/IndexAdd/AddDay'
import setWechatTitle from '../assets/js/utils.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/fa',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/UserInput',
      name: 'UserInput',
      component: UserInput,
      meta: {
        title:''
      }
    },
    
    {
      path: '/AddDay',
      name: 'AddDay',
      component: AddDay,
      meta: {
        title:'添加日程'
      }
    },
    {
      path: '/MyCustomer',
      name: 'MyCustomer',
      component: MyCustomer,
      meta: {
        title:'我的客户'
      }
    },
    {
      path: '/AddCustomer',
      name: 'AddCustomer',
      component: AddCustomer,
      meta: {
        title:'添加客户'
      }
    },
    {
      path: '/UserPhone',
      name: 'UserPhone',
      component: UserPhone,
      meta: {
        title:'绑定手机号'
      }
    },
    {
      path: '/UserPwd',
      name: 'UserPwd',
      component: UserPwd,
      meta: {
        title:'修改密码'
      }
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/UserSet',
      name: 'UserSet',
      component: UserSet,
      meta: {
        title: '个人信息'
      }
    },
    {
      path: '/Day',
      name: 'Day',
      component: Day,
      meta: {
        title: '日程'
      }
    },
    {
      path: '/Project',
      name: 'Project',
      component: Project,
      meta: {
        title: '项目'
      }
    },
    {
      path: '/MailList',
      name: 'MailList',
      component: MailList,
      meta: {
        title: '通讯录'
      }
    }
  ]
})

router.afterEach((transition) => {
  console.log(transition)
  let title;
  if (transition.meta.title === '') {
    title = '编辑'+ transition.query.title
  } else {
    title = transition.meta.title
  }
  setWechatTitle(title)
})


export default router
