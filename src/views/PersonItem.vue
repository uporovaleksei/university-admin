<script>
import api from '@/utils/api'
import imgLink from '@/utils/imgLink'
import Tiptap from '@/components/Tiptap.vue'
import { fileUploadMixin } from '@/utils/fileUploadMixin.js'
import Main from '@/layouts/Main.vue'

export default {
  components: {
    Main,
    Tiptap,
  },
  mixins: [fileUploadMixin],
  data() {
    return {
      person: [],
      imgLink: imgLink,
      show: false,
      tbname: 'persons',
      name: null,
      format: null,
      data: null,
      priority: null,
      image: null,
      img_id: null,
      description: {
        Должность: '',
        'Ученая степень': '',
        'Ученое звание': '',
      },
      interview: null,
      preview: null,
      showChange: false,
      changedId: -1,
      changeImage: null,
      changeName: null,
      changeData: null,
      changeFormat: null,
      changeDescription: {
        Должность: '',
        'Ученая степень': '',
        'Ученое звание': '',
      },
      changeInterview: null,
      id: null,
    }
  },
  created() {
    this.getPerson()
  },
  computed: {
    isAdmin() {
      return this.$store.state.user?.is_admin
    },
  },
  methods: {
    async getPerson() {
      this.person = await api.get('/person/' + this.$route.params.id)
    },
    async updatePerson() {
      console.log(this.changeInterview)
      await api.put('persons/' + this.$route.params.id, {
        id: this.$route.params.id,
        name: this.changeName,
        description: this.changeDescription,
        img: { data: this.data, format: this.format },
        interview: this.changeInterview,
      })
      location.reload()
    },
    change(index, person) {
      this.changedId = index
      this.changeName = person.name
      this.changeDescription = person.description
      this.changeInterview = person.interview
    },
  },
}
</script>

<template>
  <Main>
    <div class="changeButton">
      <button class="changeBtn" @click="change(index, person)">O</button>
    </div>
    <div class="card__wrapper">
      <div class="card__container">
        <div class="card">
          <button @click="updatePerson(person.id)" v-if="changedId === index" class="sendBtn">Подтвердить</button>
          <div class="info">
            <h2>{{ person.name }}</h2>
            <input type="text" v-model="changeName" v-if="changedId === index" />
            <div v-for="(key, headers) in person.description" :key="headers">
              <p>{{ key }}</p>
              <input :key="headers" type="text" v-model="changeDescription[headers]" v-if="changedId === index" />
            </div>
          </div>
          <img class="img" :src="imgLink(person)" />
        </div>
        <input type="file" v-if="changedId === index" @change="handleFileUpload" />
      </div>
    </div>
    <Tiptap v-model="changeInterview" v-if="changedId === index" />
    <div class="container">
      <div class="interview">
        <div class="btn" @click="show = !show">
          <h2>Интервью</h2>
          <button>></button>
        </div>
        <transition name="slide-fade">
          <div class="text" v-html="person.interview"></div>
        </transition>
      </div>
    </div>
  </Main>
</template>
<style lang="scss" scoped>
.card__wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  span {
    &::after {
      position: absolute;
      content: '';
      width: 35%;
      height: 35%;
      bottom: 0;
      right: 0;
      border-radius: 50% 50% 0 0 / 100% 100% 0 0;
      z-index: 2;
      background: linear-gradient(180.4deg, #c2bdff 0.35%, #135aae 99.65%);
      filter: blur(1px);
    }
  }

  .card__container {
    width: 80%;
    margin: 0 auto;
    height: 100%;
    min-height: 600px;
    .card {
      display: flex;
      align-items: flex-start;
      width: 45%;
      height: 100%;
      gap: 40px;
      transition: 0.3s all ease;
      img {
        z-index: 1;
        position: absolute;
        bottom: 0;
        right: 15%;
        object-fit: contain;
        width: 35%;
        border-radius: 10px;
        transition: 0.3s all ease;
      }
      .info {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        color: #0c0c0c;
        h2 {
          font-family: 'Mulish';
          font-style: normal;
          font-weight: 700;
          font-size: 36px;
          text-transform: uppercase;
        }
        h3 {
          margin-top: 60px;
          font-weight: 700;
          font-size: 18px;
          text-transform: uppercase;
        }
        p {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
        }
      }
    }
  }
}

.container {
  z-index: 20;
  width: 80%;
  margin: 0 auto;
  padding: 180px 0;
  display: flex;
  flex-direction: column;

  .interview {
    padding: 80px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .btn {
      transition: 0.3s all ease;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      img {
        transition: 0.3s all ease;
        width: 40px;
      }
      .active {
        transform: rotate(90deg);
      }
      h2 {
        font-weight: 700;
        font-size: 36px;
        text-transform: uppercase;
        color: #000000;
        cursor: pointer;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      gap: 60px;
      :deep(h1) {
        font-family: 'Mulish';
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        color: #000000;
      }
      :deep(h2) {
        font-family: 'Merriweather';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        color: #000000;
      }
      :deep(p) {
        font-family: 'Merriweather';
        font-style: italic;
        font-weight: 400;
        font-size: 24px;
        color: #000000;
        background: #ffffff;
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(220px);
  opacity: 0;
}
</style>
