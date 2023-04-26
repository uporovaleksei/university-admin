<template>
  <div>
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.login }}</td>
          <td>{{ user.password }}</td>
          <td>
            <button @click="editUser(user.id)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="editing">
      <h2>Edit User</h2>
      <form @submit.prevent="saveUser">
        <input type="text" v-model="login">
        <input type="email" v-model="password">
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      users: [],
      editing: false,
      id: null,
      login: '',
      password: ''
    }
  },
  async created() {
    this.getUsers()
  },
  methods: {
    editUser(id) {
      const user = this.users.find(user => user.id === id)
      this.editing = true
      this.id = user.id
      this.login = user.login
      this.password = user.password
    },
			async getUsers(){
      this.users = await api.get('/admin')
    },
	}
}
</script>