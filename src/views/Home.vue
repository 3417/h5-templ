<template>
  <div class="home">
    {{ userInfo?.name }}
    <div class="times">
      {{ msg }}
      {{ times | formatTime }}
    </div>
    <p>
      {{count}}
    </p>
    <button @click="addCount">Click Me</button>
  </div>
</template>

<script setup>
import { ref,getCurrentInstance, onMounted, computed } from 'vue';
import {useMainStore} from '@/store/index';
const {proxy} = getCurrentInstance();
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
const count = computed(()=>{
  return store.count
});
getDateTimes();
onMounted(()=>{
  console.log('相当于以前的this=>',proxy)
})

const addCount = ()=>{
  store.increment();
}
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
