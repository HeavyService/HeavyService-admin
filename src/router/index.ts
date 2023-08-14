import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import Login from '@/views/Auth/Login.vue'/

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import ('../views/Auth/Login.vue')
    },
    {
      path: '/auth/forget',
      name: 'forget',
      component: () => import ('../views/Auth/ForgetPassword.vue')
    }
  ]
})

export default router
