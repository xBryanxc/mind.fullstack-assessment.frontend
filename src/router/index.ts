 import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/employee/:id',
    name: 'employee-detail',
    component: DetailView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
