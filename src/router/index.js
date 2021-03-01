/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-04-01 10:56:45
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-18 14:47:55
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../layout'
import bigScreenEditLayout from '../layout/bigScreenEditLayout'
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/bigScreenList',
    name: '大屏幕设计',
    icon: 'dashboard',
    children: [
      // {
      //   path: 'projectList',
      //   component: () => import('@/views/bigScreenDesign/projectList'),
      //   name: 'ProjectList',
      //   meta: { title: '项目列表', noCache: true }
      // },
      {
        path: 'bigScreenList',
        component: () => import('@/views/bigScreenDesign/bigScreenList'),
        name: 'BigScreenList',
        meta: { title: '大屏列表', noCache: true }
      }
    ]
  },
  {
    path: '/bigScreenEdit',
    component: bigScreenEditLayout,
    redirect: '/edit',
    name: '大屏编辑',
    icon: 'dashboard',
    meta: { title: '大屏编辑', noCache: true },
    children: [
      {
        path: 'edit',
        component: () => import('@/views/editor/Index'),
        name: 'Edit',
        meta: { title: '大屏编辑', noCache: true }
      }
    ]
  },
  {
    path: '/view',
    component: () => import('@/views/editor/view'),
    name: 'View',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
