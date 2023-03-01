<template>
  <div class="home">
    {{ userInfo?.name }}
    <div class="times">
      <p>{{ msg }}</p>
      <p>
        {{ times | formatChTime }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
import { useMainStore } from '@/store/index';
const { proxy } = getCurrentInstance();
const msg = ref("Hello Vue2.7");
const userInfo = ref(null);
const times = ref("");
const store = useMainStore();
const getDateTimes = () => {
  times.value = new Date();
  setTimeout(() => {
    getDateTimes();
  }, 1000);
}
getDateTimes();
onMounted(() => {
  console.log('相当于以前的this=>', proxy)
})
</script>

<style lang="scss" scoped>
.times {
  background: linear-gradient(to right, #c20fc2, #e0f009);
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
  font-size: 10vw;

  & p:nth-child(2) {
    font-size: 12vw;
  }
}
</style>
