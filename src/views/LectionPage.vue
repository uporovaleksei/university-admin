<script>
import api from '@/utils/api'
import imgLink from '@/utils/imgLink'
import DeleteBtn from '@/components/DeleteBtn.vue'
import { fileUploadMixin } from '@/utils/fileUploadMixin.js'

import Main from '@/layouts/Main.vue'
export default {
  components: {
    Main,
    DeleteBtn,
  },

  mixins: [fileUploadMixin],
  data() {
    return {
      id: null,
      priority: null,
      title: null,
      path: null,
      duration: null,
      description: {
        Описание: '',
      },
      show: false,
      lectoins: null,
      lections: [],
      tbname: 'lections',
      format: null,
      data: null,
      img_id: null,
      preview: null,
      imgLink: imgLink,
    }
  },
  created() {
    this.getLections()
  },
  methods: {
    async getLections() {
      this.lections = await api.get('/lections')
    },
    async createLection() {
      await api.post('lections', {
        title: this.title,
        img: { data: this.data, format: this.format },
        duration: this.duration,
        description:this.description,
        path: this.path,
      })
      this.$router.go(0)
    },
   async uploadFile(event) {
  const files = Array.from(event.target.files);
  const file = files[0];
  this.path = process.env.VUE_APP_VIDEO_URL + file.name;
  event.preventDefault();

  const formData = new FormData();
  formData.append('file', file);

  const video = document.createElement('video');
  video.onloadedmetadata = () => {
    const duration = Math.floor(video.duration);
    const formattedDuration = this.formatTime(duration);
    this.duration = formattedDuration
    console.log('Длительность видео:', formattedDuration);
  };

  video.src = URL.createObjectURL(file);

  try {
    await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Файл успешно загружен');
  } catch (error) {
    console.error(error);
    alert('Ошибка загрузки файла');
  }
},
 formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    if(hours == 0){
    return `${formattedMinutes}:${formattedSeconds}`;
    }
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  },
  },
}
</script>
<template>
  <Main>
    <div class="container">
      <button @click="show = !show"   class="btn__create">
        {{ show ? 'Закрыть' : 'Создать' }}
      </button>
      <div class="add__video" v-if="show">
        <form enctype="multipart/form-data">
          <label for="input"> Загрузить видео </label>
          <input type="file" name="file" @change="uploadFile" />
        </form>
        <label for="input"> Заголовок видео </label>
        <input type="text" placeholder="Заголовок" v-model="title" />
        <label for="input"> Описание для видео </label>
        <input
          v-for="(value, key) in description"
          :key="key"
          type="text"
          :placeholder="key"
          v-model="description[key]"
        />
        <label for="input"> Длительность видео </label>
       <span>{{duration}}</span>
        <div class="create__image">
          <label for="input">Превью для видео</label>
          <input type="file" multiple="false" placeholder="Изображение" @change="handleFileUpload" />
          <div class="preview">
            <img alt="" :src="preview" />
          </div>
          <button @click="createLection" class="create__lection">Загрузить</button>
        </div>
      </div>
      <div class="cards">
        <div class="card" v-for="(item, index) in lections" :key="index">
          <DeleteBtn :id="item.id" :name="tbname" class="DeleteButton" />
          <router-link :to="'/lections/' + item.id">
            <div class="image">
              <img class="img" :src="imgLink(item)" />
              <p>{{ item.duration }}</p>
            </div>
            <div class="info">
              <div class="title">
                <h2>
                  {{ item.title.split(' ').slice(0, 3).join(' ') + '....' }}
                </h2>
              </div>
              <div class="text">
                <p>
                  {{ item.description?.['Описание'].split(' ').slice(0, 5).join(' ') + '....' }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <button id="scroll" @click="showScroll">scroll</button>
  </Main>
</template>

<style lang="scss" scoped>
.scroll {
  background: red;
}
.container {
  width: 80%;
  margin: 0 auto;
  padding-bottom: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .btn__create {
    margin: 20px;
    align-self: flex-start;
  }
  .add__video {
    margin: 20px;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    padding: 30px 0;
    form{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
        input {
      width: 100%;
      padding: 10px;
      outline: none;
      border: 1px solid var(--blue);
    }
    .create__lection {
      align-self: flex-start;
    }
    .create__image {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      img {
        width: 400px;
      }
    }
  }
  h1 {
    padding-top: 120px;
    font-weight: 700;
    font-size: 36px;
    text-transform: uppercase;
    color: #000000;
  }
  .cards {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 60px 0;
    gap: 30px;
    flex-wrap: wrap;
    .card {
      width: 370px;
      background: transparent;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      transition: 0.3s ease all;
      &:hover {
        transform: scale(1.05);
      }
      a {
        width: 370px;
        height: 415px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .image {
          width: 100%;
          display: flex;
          height: 240px;
          justify-content: center;
          position: relative;
          &::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            border-radius: 10px 10px 0 0;
            background: linear-gradient(
              180deg,
              rgba(63, 63, 63, 0) 0%,
              rgba(63, 63, 63, 0.7) 31.25%,
              rgba(0, 0, 0, 0.7) 100%
            );
          }
          img {
            border-radius: 10px 10px 0 0;
            width: 100%;
            height: 240px;
            object-fit: cover;
          }
          p {
            position: absolute;
            color: #fff;
            bottom: 0;
            right: 0;
            margin: 20px;
          }
        }
        .info {
          width: 100%;
          height: 100%;
          background: #185091;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-radius: 0 0 10px 10px;
          .title {
            h2 {
              font-weight: 700;
              font-size: 22px;
              text-transform: uppercase;
              color: #ffffff;
            }
          }
          .text {
            width: 100%;
            display: flex;
            flex-direction: column;
            height: 100%;
            p {
              font-weight: 300;
              font-size: 20px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>
