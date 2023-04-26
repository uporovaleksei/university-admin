import { createRouter, createWebHistory } from 'vue-router'
import AdminUsers from '@/components/AdminUsers.vue'
import MainPage from '@/components/MainPage.vue'
import Authorization from '@/components/Authorization.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: MainPage
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminUsers
  },
  {
    path: '/login',
    name: 'login',
    component: Authorization
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
