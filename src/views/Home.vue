<template>
  <div class="home" v-water-mark v-longpress:600="()=>{}">
    {{ userInfo?.name }}
    <div class="times">
      <p>{{ msg }}</p>
      <p>
        {{ times | formatChTime }}
      </p>
    </div>

    <button @click="Mask">clickMask</button>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
import { useMainStore } from '@/store/index';
import Rules from './Rules.vue';
const { proxy } = getCurrentInstance();
const msg = ref("Hello Vue2.7");
const userInfo = ref(null);
const times = ref("");
const time = ref(10);
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
  console.log(proxy.$options.msg)
})

const Mask = ()=>{
  proxy.$request.get("http://127.0.0.1:9559",{loading:true})
  setTimeout(() => {
      proxy.$request.get("http://127.0.0.1:9559",{loading:true})
    }, 3000);
}
</script>

<style lang="scss" scoped>
.home{
  height: 100vh;
}
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
