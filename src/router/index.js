import { createRouter, createWebHistory } from 'vue-router'
import AdminUsers from '@/components/AdminUsers.vue'
import Authorization from '@/components/Authorization.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: AdminUsers
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminUsers
  },
  {
    path: '/authorization',
    name: 'Authorization',
    component: Authorization
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
