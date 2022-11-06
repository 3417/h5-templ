<template>
  <div class="home">
    {{ userInfo?.name }}
    <div class="times">
      {{ msg }}
      {{ times | formatTime }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const msg = ref("Hello Vue2.7");
const userInfo = ref(null);
const times = ref("");
const getDateTimes = () => {
  times.value = new Date();
  setTimeout(() => {
    getDateTimes();
  }, 1000);
}
getDateTimes();
</script>

<style>
.times {
  background: linear-gradient(to right, #c20fc2, #e0f009);
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
  font-size: 12vw;
}
</style>
