<template>
  <NavBar v-if="isAdmin"/>
  <slot v-if="isAdmin"></slot>
  <Logout v-if="!isAdmin"/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Logout from '@/components/Logout.vue'
import { useAuthStore } from '@/store/index.js';

export default {
  components: {
    NavBar,
    Logout,
  }, 
data() {
    return {
      authStore: useAuthStore(),
    }
},
computed: {
    isAdmin(){
       return this.authStore.user?.is_admin;
    }
  },
}
</script>

<style lang="scss" scoped></style>
