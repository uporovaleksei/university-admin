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
			lection:{},
      file: null,
      imgLink: imgLink
    }
  },
    created(){
    this.getLection()
  },

  methods: {
    async getLection(){
      this.lection = await api.get('/lection/'+ this.$route.params.id)
    },
      async uploadFile(event) {
      event.preventDefault()
      const formData = new FormData()
      formData.append('file', event.target.file.files[0])

      try {
        await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        alert('File uploaded successfully')
      } catch (error) {
        console.error(error)
        alert('Error uploading file')
      }
    }
  },
  }
</script>
<template>
  <Main>
    <form @submit="uploadFile" enctype="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
    
      <div class="video">
				<video :src="lection.path" controls></video>
        <h2>{{ lection.title }}</h2>
      </div>
  </Main>
</template>

<style>
video{
	width: 400px;
}
</style>