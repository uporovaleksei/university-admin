import { createStore } from 'vuex'

import api from '@/utils/api'
import router from '../router'

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    forgetUser(state) {
      state.user = null
      router.push({ name: '/' }).catch()
    },
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    async login(context, payload) {
      const data = await api.post('/login', payload)
      if (data.error) return data
      context.commit('setUser', data)
    },
    async logout(context) {
      await api.post('/logout')
      context.commit('forgetUser')
    },
    async reg(context, payload) {
      const data = await api.post('/reg', payload)
      if (data.error) return data
      context.commit('setUser', data)
    },
    async refresh(context) {
      const user = await api.get('/refresh')
      if (user.error) return user
      context.commit('setUser', user)
    },
  },
})
