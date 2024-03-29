<script>
import api from '@/utils/api';
import imgLink from '@/utils/imgLink';
import Tiptap from '@/components/Tiptap.vue';
import Main from '@/layouts/Main.vue';
import { useAuthStore } from '@/store/index';

export default {
  components: {
    Main,
    Tiptap,
  },
  data() {
    return {
      authStore: useAuthStore(),
      person: [],
      preloader: true,
      imgLink: imgLink,
      show: false,
      tbname: 'persons',
      changedId: -1,
      changeName: null,
      changeData: null,
      changeFormat: null,
      changeDescription: {
        Должность: '',
        'Ученая степень': '',
        'Ученое звание': '',
      },
      changeInterview: null,
    };
  },
  created() {
    this.getPerson();
  },
  computed: {
    isAdmin() {
      return this.authStore.user?.is_admin;
    },
  },
  methods: {
    async getPerson() {
      this.showPreloader(true)
      this.person = await api.get(`/person/${this.$route.params.id}`);
      document.body.style = 'overflow: auto;'
      this.showPreloader(false)
    },
    async updatePerson(personId) {
      this.showPreloader(true)
      await api.put(`persons/${personId}`, {
        id: personId,
        name: this.changeName,
        description: this.changeDescription,
        img: { data: this.changeData, format: this.changeFormat },
        interview: this.changeInterview,
      });
      this.showPreloader(false)
      location.reload();
    },
    change(index, person) {
      this.changedId = index;
      this.changeName = person.name;
      this.changeDescription = { ...person.description };
      this.changeInterview = person.interview;
      this.changeData = null;
      this.changeFormat = null;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.changeFormat = file.name.match(/\.([^.]+)$/)[1];
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.changeData = ev.target.result;
      };
      reader.readAsDataURL(file);
    },
    showPreloader(status){
      this.preloader = status
      if(this.preloader == true){
        document.body.style = 'overflow: hidden;'
      }else{
        document.body.style = 'overflow: auto;'
      }
    }
  },
};
</script>

<template>
  <Main>
    <div class="changeButton">
      <button class="changeBtn" @click="change(index, person), show = !show">
        <img src="@/assets/images/pen.svg" alt="" />
      </button>
    </div>
    <div class="card__wrapper">
      <div class="card__container">
        <div class="card">
          <div class="info">
            <h2 v-if="isAdmin">{{ person.name }}</h2>
            <input id="createName" type="text" v-model="changeName" v-if="changedId === index && show" />
            <div v-for="(key, headers) in person.description" :key="headers" class="description">
              <p>{{ key }}</p>
              <input :key="headers" type="text" v-model="changeDescription[headers]" v-if="changedId === index && show" />
            </div>
          </div>
          <div class="image">
            <img class="img" :src="imgLink(person)" />
            <input id="updateImage" type="file" v-if="changedId === index && show" @change="handleFileUpload" />
          </div>
          <button @click="updatePerson(person.id)" v-if="changedId === index && show" class="sendBtn">Подтвердить</button>
        </div>
      </div>
    </div>
    <Tiptap v-model="changeInterview" v-if="changedId === index && show" />
    <div class="container">
      <button @click="updatePerson(person.id)" v-if="changedId === index && show" class="sendInterviewBtn">Подтвердить</button>
      <div class="interview">
        <div class="btn" @click="show = !show">
          <h2>Интервью</h2>
        </div>
        <transition name="slide-fade">
          <div class="text">{{ person.interview }}</div>
        </transition>
      </div>
    </div>
    <div class="preloader" v-if="preloader">
      <span class="loader"></span>
    </div>
  </Main>
</template>

<style lang="scss" scoped>

.sendInterviewBtn {
  align-self: flex-start;
}
.changeButton {
  display: flex;
  justify-content: flex-start;
  width: 80%;
  margin: 20px auto;
  .changeBtn {
    width: 32px;
    height: 32px;
    border-radius: 5px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
        &:hover{
      opacity: 0.8;
    }
    &:active{
      scale: 0.93;
    }
  }
}
.card__wrapper {
  width: 100%;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
    padding: 15px;
    border-radius: 15px;
    box-shadow: 0 0 5px #135aae;
    min-height: 600px;
    .card {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      gap: 40px;
      transition: 0.3s all ease;
      .sendBtn{
        padding: 8px;
        border-radius: 5px;
        cursor: pointer;
      }
      input {
        width: 100%;
        padding: 10px;
        outline: none;
        border: 1px solid var(--blue);
      }
      .image{
        display: flex;
        flex-direction: column;
      
      img {
        object-fit: contain;
        width: 100%;
        border-radius: 10px;
        transition: 0.3s all ease;
      }
      }
      .info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
        color: #0c0c0c;
        .description{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-self: flex-start;
          width: 100%;
        }
        h2 {
          align-self: flex-start;
          font-family: 'Mulish';
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
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
          text-align: start;
        }
      }
    }
  }
}

.container {
  z-index: 20;
  width: 80%;
  margin: 0 auto;
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
.preloader{
  position: absolute;
  width: 100%;
  height: 100dvh;
  background: #00000053;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #135aae;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
}

</style>
