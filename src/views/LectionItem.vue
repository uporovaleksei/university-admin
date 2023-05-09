<script>
import api from '@/utils/api'
import imgLink from '@/utils/imgLink'

import Main from '@/layouts/Main.vue'
export default {
  components: {
    Main,
  },
  data() {
    return {
      id: null,
      priority: null,
      title: null,
      img_id: null,
      path: null,
      duration: null,
      description: null,
      lectoins: null,
      lection: {},
      file: null,
      imgLink: imgLink,
    }
  },
  created() {
    this.getLection()
  },

  methods: {
    async getLection() {
      this.lection = await api.get('/lection/' + this.$route.params.id)
    },
  },
}
</script>
<template>
  <Main>
    <div class="video">
      <video :src="lection.path" controls></video>
      <h2>{{ lection.title }}</h2>
    </div>
  </Main>
</template>

<style>
video {
  width: 400px;
}
</style>
