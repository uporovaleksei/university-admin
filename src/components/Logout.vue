<script>
import { useAuthStore } from '@/store/index.js';

export default {
 data() {
    return {
      authStore: useAuthStore(),
    }
},
computed: {
    isAdmin(){
      console.log(this.authStore.user);
       return this.authStore.user?.is_admin;
    }
  },
}
</script>

<template>
<div>
	<div class="container">
      <h1>Для редактирования</h1>
      <router-link :to="'/'">
       Авторизируйтесь
      </router-link>
	</div>
  </div>
</template>



<style lang="scss" scoped>

.container{
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 10px;
	a{
		font-size: 2rem;
		font-weight: 900;
		text-decoration: underline;
		transition: 0.3s;
		&:hover{
			opacity: 0.7;
		}
	}
}

</style>