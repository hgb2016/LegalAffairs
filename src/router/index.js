import Vue from 'vue'
import Router from 'vue-router'
import postHttp from "../assets/js/postHttp.js"

import Index from '@/components/Index/Index'
import Day from '@/components/Index/Day'
import ContactList from '@/components/Index/ContactList'
import Project from '@/components/Index/Project'
import User from '@/components/User/User'
import UserSet from '@/components/User/UserSet'
import UserInput from '@/components/User/UserInput'
import UserPhone from '@/components/User/UserPhone'
import UserPwd from '@/components/User/UserPwd'
import Feedback from '@/components/User/Feedback'
import ExportDay from '@/components/User/ExportDay'
import MyCustomer from '@/components/UserList/MyCustomer'
import AddCustomer from '@/components/UserList/AddCustomer'
import CustomerDetails from '@/components/UserList/CustomerDetails'
import AddDay from '@/components/IndexAdd/AddDay'
import WhoSee from '@/components/IndexAdd/WhoSee'
import AddPro from '@/components/IndexAdd/AddPro'
import DayDetails from '@/components/IndexAdd/DayDetails'
import ToolBar from '@/components/IndexAdd/ToolBar'
import setWechatTitle from '../assets/js/utils.js'
import ProjectDetail from '@/components/Project/ProjectDetail'
import ContactInfo from '@/components/Contact/ContactInfo'
import CreateProject from '@/components/Project/CreateProject2'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/ExportDay',
      name: 'ExportDay',
      component: ExportDay,
      meta: {
        title: '导出日程'
      }
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/Feedback',
      name: 'Feedback',
      component: Feedback,
      meta: {
        title: '反馈意见'
      }
    },
    {
      path: '/WhoSee',
      name: 'WhoSee',
      component: WhoSee,
      meta: {
        title: '谁可以看我的工作'
      }
    },
    {
      path: '/AddPro',
      name: 'AddPro',
      component: AddPro,
      meta: {
        title: '新建项目'
      }
    },

    {
      path: '/UserInput',
      name: 'UserInput',
      component: UserInput,
      meta: {
        title: ''
      }
    },
    {
      path: '/DayDetails',
      name: 'DayDetails',
      component: DayDetails,
      meta: {
        title: '日程详情'
      }
    },
    {
      path: '/CustomerDetails',
      name: 'CustomerDetails',
      component: CustomerDetails,
      meta: {
        title: '客户详情'
      }
    },
    {
      path: '/ToolBar',
      name: 'ToolBar',
      component: ToolBar,
      meta: {
        title: '工具'
      }
    },
    {
      path: '/AddDay',
      name: 'AddDay',
      component: AddDay,
      meta: {
        title: '添加日程'
      }
    },
    {
      path: '/MyCustomer',
      name: 'MyCustomer',
      component: MyCustomer,
      meta: {
        title: '我的客户'
      }
    },
    {
      path: '/AddCustomer',
      name: 'AddCustomer',
      component: AddCustomer,
      meta: {
        title: '添加客户'
      }
    },
    {
      path: '/UserPhone',
      name: 'UserPhone',
      component: UserPhone,
      meta: {
        title: '绑定手机号'
      }
    },
    {
      path: '/UserPwd',
      name: 'UserPwd',
      component: UserPwd,
      meta: {
        title: '修改密码'
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
      path: '/ContactList',
      name: 'ContactList',
      component: ContactList,
      meta: {
        title: '通讯录'
      }
    },
    {
      path: '/ProjectDetail',
      name: 'ProjectDetail',
      component: ProjectDetail,
      meta: {
        title: '项目详情'
      }
    },
    {
      path: '/ContactInfo',
      name: 'ContactInfo',
      component: ContactInfo,
      meta: {
        title: '联系人信息'
      }
    },
    {
      path: '/CreateProject',
      name: 'CreateProject',
      component: CreateProject,
      meta: {
        title: '创建项目'
      }
    }
  ]
})

router.afterEach((transition) => {
  let title;
  if (transition.meta.title === '') {
    title = '编辑' + transition.query.title
  } else {
    title = transition.meta.title
  }
  setWechatTitle(title)
})


export default router
