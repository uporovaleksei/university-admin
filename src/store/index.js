import { createStore } from 'vuex'

import api from '@/api'
import router from "../router"

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    forgetUser(state){
      state.user = null
      router.push({name: '/'}).catch()
    },
    setUser(state, user){
      state.user = user
    },
  },
  actions: {
    async login(context, payload){
      const data = await api.post("user/login", payload)
      if(data.error)
        return data
      context.commit("setUser", data)
    },
    async logout(context){
      await api.post("user/logout")
      context.commit("forgetUser")
    },
    async reg(context, payload){
      const data = await api.post("user/reg", payload)
      if(data.error)
        return data
      context.commit("setUser", data)
    },
    async refresh(context){
      const user = await api.get("user/refresh")
      if(user.error)
        return user
      context.commit("setUser", user)
    }
  },
})
