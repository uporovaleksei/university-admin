<script>
import api from "@/utils/api"
import imgLink from '@/utils/imgLink'

import Main from "@/layouts/Main.vue"
  export default {
      components: {
    Main,
  },
  data() {
    return {
      id:null,
			priority:null,
			title:null,
			img_id:null,
			path:null,
			duration:null,
			description:null,
      lectoins:null,
			storie:{},
      imgLink: imgLink
    }
  },
    created(){
    this.getStorie()
  },

  methods: {
    async getStorie(){
      this.storie = await api.get('/storie/'+ this.$route.params.id)
    },
  },
  }
</script>
<template>
  <Main>
      <div class="video">
				<video :src="storie.path" controls></video>
        <h2>{{ storie.title }}</h2>
      </div>
  </Main>
</template>

<style>
video{
	width: 400px;
}
</style>