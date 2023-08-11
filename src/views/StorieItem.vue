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
      changeTitle: null,
      changeData: '',
      changeFormat: '',
      priority: null,
      show: false,
      img_id: null,
      duration: null,
      stories: null,
      storie: {},
      file: null,
      imgLink: imgLink,
      format: null,
      data: null,
      image: null,
      preview: null,
      showChange: false,
      changedId: -1,
      changeImage: null,
      changeDescription: {
        'Описание': '',
      },
    }
  },
  created() {
    this.getStorie()
  },
  methods: {
    async getStorie() {
      this.storie = await api.get(`/storie/${this.$route.params.id}`)
    },
    async updateStorie() {
      await api.patch(`/stories/${this.$route.params.id}`, {
        id: this.$route.params.id,
        title: this.changeTitle,
        img: { data: this.changeData, format: this.changeFormat },
      })
      location.reload()
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files)
      if (files.length > 0) {
        const file = files[0]
        this.changeFormat = file.name.match(/\.([^.]+)$/)[1]
        const reader = new FileReader()
        reader.onload = ev => {
          const src = ev.target.result
          this.preview = src
          this.changeData = reader.result
        }
        reader.readAsDataURL(file)
      }
    },
    ChangehandleFileUpload(event) {
      const files = Array.from(event.target.files)
      if (files.length > 0) {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = ev => {
          const src = ev.target.result
          this.changeImage = src
        }
        reader.readAsDataURL(file)
      }
    },
    change(index, storie) {
      this.changedId = index
      this.changeTitle = storie.title
      this.changeData = this.data
      this.changeFormat = this.format
    },
  },
}
</script>
<template>
  <Main>
    <div class="changeButton">
      <button class="changeBtn" @click="change(index, storie), show = !show">
        <img src="@/assets/images/pen.svg" alt="" />
      </button>
    </div>
    <div class="card">
        <input id="updateImage" type="file" v-if="changedId === index && show" @change="handleFileUpload" />
        <div class="image">
          <img class="img" :src="imgLink(storie)" />
          <p>{{ storie.duration }}</p>
        </div>
        <div class="info">
          <div class="title">
            <h2>
              {{storie.title}}
            </h2>
          </div>
           <input id="changeTitle" type="text" v-model="changeTitle" v-if="changedId === index && show" />

          <button @click="updateStorie(storie.id)" v-if="changedId === index && show" class="sendBtn">Подтвердить</button>
        </div>
    </div>
  </Main>
</template>

<style lang="scss" scoped>
.changeButton {
  display: flex;
  justify-content: flex-start;
  width: 80%;
  margin: 20px auto;
  .changeBtn {
    width: 32px;
    height: 32px;
    border-radius: 5px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.card{
  width: 80%;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  input{
  width: 50%;
  padding: 10px;
  outline: none;
  border: 1px solid var(--blue);
  }
  .image,.text,.info{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    img{
      width: 600px;
    }
    .text{

    }
  }
}

</style>
