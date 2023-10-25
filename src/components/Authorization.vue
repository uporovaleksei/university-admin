<template>
  <div>

    <div v-if="authStore.isAuthenticated">
      Добро пожаловать, {{ authStore.user.login }}
      <button @click="logout">Выйти</button>
    </div>

    <div class="auth">
      <div class="auth__container">
        <div class="auth__body">
          <div class="auth__title">
            <h1>Авторизация</h1>
          </div>
          <div class="reg__login">
            <input type="text" placeholder="Логин" v-model="loginInput" />
          </div>
          <div class="reg__password">
            <input type="password" placeholder="Пароль" v-model="passwordInput" />
          </div>
          <div class="auth__submit">
            <button @click="getLogin">Войти</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/index.js';
import api from '@/utils/api'

export default {
  data() {
    return {
      loginInput: '',
      passwordInput: '',
      authStore: useAuthStore(),
    }
  },
  methods: {
    async getLogin() {
      const response = await api.post('/login', {
        login: this.loginInput,
        password: this.passwordInput,
      })

      if (response?.error) {
        alert(response.error)
        return
      }
      this.authStore.setUser(response)
      this.$router.push({ name: 'lections' })
    },

  },
}
</script>


<style lang="scss">
.auth {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}

.auth__container {
  display: flex;
  justify-content: center;
  align-content: center;
}

.auth__body {
  background: var(--blue);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  flex-direction: column;
  border-radius: 12px;
  padding: 60px;
}

.auth__title h1 {
  color: #fff;
  font-size: 2rem;
}

.reg__login input,
.reg__password input {
  padding: 10px 25px;
  border: 1px solid #fff;
  outline: none;

  &:focus {
    padding: 10px 25px;
    border: 1px solid #80d1cd;
  }
}

.auth__submit {
  width: 100%;

  button {
    background: #fff;
    color: #000;
    font-weight: 500;
    border: 0;
    width: 100%;
    padding: 10px 0;
    transition: 0.3s ease;

    &:hover {
      background: #ffffffa4;
    }

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
