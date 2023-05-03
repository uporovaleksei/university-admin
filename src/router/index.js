import { createRouter, createWebHistory } from 'vue-router'
import AdminUsers from '@/components/AdminUsers.vue'
import MainPage from '@/views/MainPage.vue'
import LectionPage from '@/views/LectionPage.vue'
import LectionItem from '@/views/LectionItem.vue'
import StoriesPage from '@/views/StoriesPage.vue'
import StorieItem from '@/views/StorieItem.vue'
import PersonsPage from '@/views/PersonsPage.vue'
import PersonItem from '@/views/PersonItem.vue'
import AboutUs from '@/views/AboutUs.vue'
import Authorization from '@/components/Authorization.vue'

const routes = [
  {
    path: '/',
    name: 'Authorization',
    component: Authorization
  },
  {
    path: '/lections',
    name: 'lections',
    component: LectionPage
  },
  {
    path: '/lections/:id',
    name: 'lection',
    component: LectionItem
  },
  {
    path: '/stories',
    name: 'stories',
    component: StoriesPage
  },
  {
    path: '/stories/:id',
    name: 'storie',
    component: StorieItem
  },
  {
    path: '/persons',
    name: 'persons',
    component: PersonsPage
  },
  {
    path: '/persons/:id',
    name: 'person',
    component: PersonItem
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUs
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
