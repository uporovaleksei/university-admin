<script>
import api from '@/utils/api'
import imgLink from '@/utils/imgLink'
import Tiptap from '@/components/Tiptap.vue'
import DeleteBtn from '@/components/DeleteBtn.vue'
import { fileUploadMixin } from '@/utils/fileUploadMixin.js'
import Main from '@/layouts/Main.vue'
export default {
  components: {
    Main,
    Tiptap,
    DeleteBtn,
  },
  mixins: [fileUploadMixin],
  data() {
    return {
      persons: [],
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
      id: null,
    }
  },
  created() {
    this.getPersons()
  },

  methods: {
    async createPersons() {
      await api.post('persons', {
        name: this.name,
        img: { data: this.data, format: this.format },
        description: this.description,
        interview: this.interview,
      })
      this.$router.go(0)
    },
    async getPersons() {
      this.persons = await api.get('/persons')
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.user?.is_admin
    },
  },
}
</script>
<template>
  <Main>
    <div class="person__create__container">
      <div class="person__create">
        <button @click="show = !show">
          {{ show ? 'Закрыть' : 'Создать' }}
        </button>
      </div>
      <transition name="slide-fade">
        <div class="create__card" v-if="show">
          <div class="create__title">
            <input type="text" placeholder="ФИО" v-model="name" />
            <input
              v-for="(value, key) in description"
              :key="key"
              type="text"
              :placeholder="key"
              v-model="description[key]"
            />
          </div>
          <div class="create__image">
            <label for="input">Контактная информация</label>
            <input type="file" multiple="false" placeholder="Изображение" @change="handleFileUpload" />
            <div class="preview">
              <img alt="" :src="preview" />
            </div>
          </div>
          <Tiptap v-model="interview" />
          <div class="accept__btn">
            <button @click="createPersons">Добавить</button>
          </div>
        </div>
      </transition>
    </div>
    <div class="container">
      <h1>Наши наставники</h1>
      <div class="cards">
        <div class="card" v-for="item in persons" :key="item.id">
          <DeleteBtn :id="item.id" :name="tbname" class="DeleteButton" />
          <router-link :to="'/persons/' + item.id">
            <div class="image">
              <img class="img" :src="imgLink(item)" />
            </div>
            <div class="text">
              <h2>{{ item.name }}</h2>
              <!-- <p>{{ item.description?.['Должность'] }}</p> -->
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </Main>
</template>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  h1 {
    margin-top: 40px;
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 36px;
    text-transform: uppercase;
    color: #000000;
  }
  .cards {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 75px;
    flex-wrap: wrap;
    .card {
      width: calc(30% - 10px);
      height: 100%;
      border-radius: 10px;
      background: #fff;
      position: relative;
      transition: 0.3s all ease-in-out;
      img {
        width: 100%;
        height: 480px;
        object-fit: cover;
        align-self: center;
        background: linear-gradient(291.45deg, #d1fff4 11.63%, #f0dcff 92.9%);
        border-radius: 10px 10px 0px 0px;
      }
      &:nth-child(2n) img {
        background: linear-gradient(291.45deg, #e2f9fb 11.63%, #e6fcfc 92.9%);
      }
      &:nth-child(3n) img {
        background: linear-gradient(59deg, #e6eaf1 13.28%, #b2d7fc 87.42%);
      }
      &::after {
        position: absolute;
        z-index: -1;
        top: 0px;
        left: 0px;
        content: '';
        width: 100%;
        height: 100%;
        background: #fff;
        filter: drop-shadow(2px 4px 4px #185091);
        border-radius: 10px;
        opacity: 0;
        transition: 0.3s all ease;
      }
      &:hover::after {
        opacity: 1;
      }
      .text {
        z-index: 5;
        display: flex;
        flex-direction: column;
        align-items: center;
        h2 {
          width: 90%;
          font-family: 'Unbounded';
          font-style: normal;
          font-weight: 700;
          font-size: 20px;
          text-align: center;
          text-transform: uppercase;
          color: #000000;
          margin: 10px 0;
        }
        p {
          width: 80%;
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          text-align: center;
          color: #000000;
        }
      }
    }
  }
  a {
    padding: 60px 0;
    align-self: flex-end;
    button {
      cursor: pointer;
      width: 270px;
      height: 50px;
      border: 0;
      background: #ffffff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      font-weight: 400;
      font-size: 24px;
      color: #000000;
      transition: 0.3s ease all;
      &:hover {
        box-shadow: 0px 4px 4px #5e6ad3;
      }
    }
  }
}
@media (max-width: 1024px) {
  .container {
    .cards {
      justify-content: space-between;
      .card {
        width: 29%;
        height: 100%;
        min-height: 420px;
        a {
          height: 200px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        &::after {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
<style scoped>
.changeButton {
  align-self: flex-start;
}
.DeleteButton {
  align-self: flex-start;
}
.person {
  margin: 120px 0;
}
.person__container {
  width: 80%;
  margin: 0 auto;
}
.person__title h1 {
  font-size: 2rem;
  color: var(--blue);
  font-weight: 600;
}
.person__body {
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.person__item {
  display: flex;
  gap: 20px;
}
.person__item h2 {
  font-size: 1.2rem;
  color: var(--blue);
}
.person__photo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  background: var(--blue);
}
.person__photo input {
  width: 100%;
  background: #ffffff;
  border: var(--blue) 2px solid;
  margin: 0;
}
.person__photo img {
  width: 300px;
  height: 100%;

  border: var(--blue) 2px solid;
}
.person__photo p {
  font-size: 2rem;
  color: #fff;
  font-weight: 500;
}
.person__name,
.person__status,
.person___phone,
.person__email {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.person__info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
}
.person__create__container {
  width: 60%;
  margin: 160px auto 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.create__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
}
.person__create button {
  margin: 20px 0;
  padding: 10px 25px;
  background: var(--blue);
  color: #fff;
  border-radius: 50px;
  transition: 0.3s ease;
}
.person__create button:hover {
  background: var(--blue);
}
.person__create button:active {
  transform: scale(0.9);
}
.accept__btn button {
  margin: 20px 0;
  padding: 10px 25px;
  background: var(--blue);
  color: #fff;

  border-radius: 0;
  transition: 0.3s ease;
}
.accept__btn button:hover {
  border-radius: 50px;
  background: var(--blue);
}
.accept__btn button:active {
  transform: translateY(-5px);
}
.create__image {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
}
.create__image img {
  width: 400px;
}
.create__image input {
  width: 50%;
  padding: 10px;
  outline: none;
  border: 1px solid var(--blue);
}
.create__title {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.create__title input {
  width: 50%;
  padding: 10px;
  outline: none;
  border: 1px solid var(--blue);
}
.create__title input:focus {
  border: 1px solid #60a5a3;
}
.slide-fade-enter-active {
  transition: all 0.3s;
}
.slide-fade-leave-active {
  transition: all 0.3s;
}
.slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.slide-fade-enter {
  opacity: 0;
}
</style>
