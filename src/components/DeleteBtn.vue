<template>
  <div class="delete__btn">
    <button @click="del(name, id)">X</button>
  </div>
</template>

<script>
import api from '@/utils/api'
export default {
  props: {
    id: Number,
    name: String,
  },
  data() {
    return {
      async del(name, id) {
        const accept = confirm('Удалить элемент?')
        if (accept) {
          await api.delete(name + '/' + id)
          location.reload()
        } else {
          return
        }
      },
    }
  },
}
</script>

<style>
.delete__btn {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}

.delete__btn button {
  font-size: 1.2rem;
  font-weight: 500;
  background: #ce3b3b;
  transition: 0.3s;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.delete__btn button:hover {
  background: #ce3b3b94;
}

.delete__btn button:active {
  transform: scale(0.9);
}
</style>
