<script>
export default {
  data() {
    return {
      paths: [
        {
          label: 'Лекции',
          path: '/lections',
        },
        {
          label: 'Истории',
          path: '/stories',
        },
        {
          label: 'Наставники',
          path: '/persons',
        },
      ],
      menuIsOpen: false,
    }
  },
}
</script>

<template>
  <nav>
    <div class="content">
      <ul>
        <li v-for="item in paths" :key="item.path">
          <router-link :to="item.path" :class="{ active__links: menuIsOpen, main: path === '/' }">
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  height: 60px;
  background: var(--blue);
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 80%;
    margin: 0 auto;
    ul {
      display: flex;
      align-items: center;
      gap: 20px;
      li {
        a {
          color: #fff;
          font-size: 18px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
