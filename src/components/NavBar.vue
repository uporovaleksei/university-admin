<script>

import { useAuthStore } from '@/store/index.js';
import api from '@/utils/api'


export default {
  data() {
    return {
      paths: [
        {
          label: 'Лекции',
          path: '/lections',
        },
        {
          label: 'Истории',
          path: '/stories',
        },
        {
          label: 'Наставники',
          path: '/persons',
        },
      ],
      menuIsOpen: false,
      authStore: useAuthStore(),
    }
  },
     computed: {
    isAdmin(){
      console.log(this.authStore.user);
       return this.authStore.user?.is_admin;
    }
  },
  methods:{
        async logout() {
      await api.post('/logout')
      this.authStore.forgetUser()
      this.$router.push('/')

    },
  }
}
</script>

<template>
  <nav v-if="isAdmin">
    <div class="content">
      <ul>
        <li v-for="item in paths" :key="item.path">
          <router-link :to="item.path" :class="{ active__links: menuIsOpen, main: path === '/' }">
            {{ item.label }}
          </router-link>
        </li>
        <li class="logout">
          <a href="#" @click="logout">
            Выход
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  height: 60px;
  background: var(--blue);
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 80%;
    margin: 0 auto;
    ul {
      display: flex;
      align-items: center;
      gap: 20px;
      li {
        a {
          color: #fff;
          font-size: 18px;
          font-weight: 500;
        }
      }
       .logout{
        position: absolute;
        right: 20%;
      } 
    }
  }
}
</style>
