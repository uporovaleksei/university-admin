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
			stories:[],
      imgLink: imgLink
    }
  },
    created(){
    this.getStories()
  },

  methods: {
    async getStories(){
      this.stories = await api.get('/stories')
			console.log(this.items);
    },
  },
  }
</script>
<template>
  <Main>
    <div class="container">
      <h1>{{ title }}</h1>
      <div class="cards">
        <div class="card" v-for="(item, index) in stories" :key="index">
          <router-link :to="'/stories/' + item.id">
            <div class="image">
              <img class="img" :src="imgLink(item)" />
              <p>{{ item.duration }}</p>
            </div>
            <div class="info">
              <div class="title">
                <h2>{{ item.title.split(' ').slice(0, 3).join(' ') + '....' }}</h2>
              </div>
              <div class="text">
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </Main>
</template>

<style lang="scss" scoped>
.scroll {
  background: red;
}
.container {
  width: 60%;
  margin: 0 auto;
  padding-bottom: 400px;
  h1 {
    padding-top: 120px;
    font-weight: 700;
    font-size: 36px;
    text-transform: uppercase;
    color: #000000;
  }
  .cards {
    display: flex;
    margin: 60px 0;
    gap: 30px;
    .card {
      width: 370px;
      height: 415px;
      background: #d9d9d9;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      transition: 0.3s ease all;
      &:hover {
        transform: scale(1.05);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
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
