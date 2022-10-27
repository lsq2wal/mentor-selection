import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'
import * as consty from '@/datasource/Const'
import { useStore } from '@/store'

const routes: Array<RouteRecordRaw> = [

  {
      path: '/',
      name:'login',
      component:()=>import("@/views/Login.vue"),
  },
  {
      path: '/student',
      component:()=>import("@/views/Student.vue"),
      meta:{
        role:"As2F"
      }
  },
  {
      path: '/teacher',
      component:()=>import("@/views/Teacher.vue"),
      meta:{
        role:"Pgku"
      }
  },
  {
      path: '/changePassword',
      name:'changePassword',
      component:()=>import("@/views/ChangePassword.vue"),
  },
]

const router = createRouter({
  // HTML5 Mode。createWebHistory()函数，生产环境下需要web容器完成转发
  // createWebHashHistory()函数仍使用#符号，无需配置
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // 排除，没有声明角色权限的路由
  if (!to.meta.role) {
    next()
    return
  }

  if (to.meta.role != sessionStorage.getItem('role')) {
    next({ name: 'login' })
    // 调用函数获取pinia state数据，必须在pinia加载后执行
    const store = useStore()
    store.exception = '无权限'
    return
  }
  next()
})

export default router
