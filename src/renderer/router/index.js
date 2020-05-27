import Vue from "vue"
import Router from "vue-router"
import Login from "../components/login"
import Layout from "../components/home/layout.vue"

import FileBackup from '../components/views/FileBackup'
import NutCloud from '../components/views/NutCloud'
import Instructions from '../components/views/Instructions'
import TencentMicroCloud from '../components/views/TencentMicroCloud'
import PrivateStorage from '../components/views/PrivateStorage'
import SkyDrive from '../components/views/SkyDrive'
import FileManagement from '../components/views/FileManagement'
import Text from '../components/views/text'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    },

    //使用说明
    {
      path: '/Instructions',
      component: Layout,
      children: [{
        path: '/',
        component: Instructions,
        meta: {
          title: '使用说明'
        }
      }]
    },
    //私人云盘
    {
      path: '/PrivateStorage',
      component: Layout,
      children: [{
        path: '/',
        component: PrivateStorage,
        meta: {
          title: '私人云盘'
        }
      }]
    },

    //坚果云
    {
      path: '/NutCloud',
      component: Layout,
      children: [{
        path: '/',
        component: NutCloud,
        meta: {
          title: '坚果云'
        }
      }]
    },

    //腾讯微云
    {
      path: '/TencentMicroCloud',
      component: Layout,
      children: [{
        path: '/',
        component: TencentMicroCloud,
        meta: {
          title: '腾讯微云'
        }
      }]
    },

    //文件备份
    {
      path: '/FileBackup',
      component: Layout,
      children: [{
        path: '/',
        component: FileBackup,
        meta: {
          title: '文件备份'
        }
      }]
    },
    {
      path: '/SkyDrive',
      component: Layout,
      children: [{
        path: '/',
        component: SkyDrive,
        meta: {
          title: '城通网盘'
        }
      }]
    },
    {
      path: '/FileManagement',
      component: Layout,
      children: [{
        path: '/',
        component: FileManagement,
        meta: {
          title: '文件管理'
        }
      }]
    },
    {
      path: '/Text',
      component: Layout,
      children: [{
        path: '/',
        component: Text,
        meta: {
          title: '文本编辑'
        }
      }]
    },


    {
      path: '*',
      redirect: '/login'
    },

  ]
})