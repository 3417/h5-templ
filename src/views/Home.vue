<template>
  <div class="home">
    <h2>{{msg}}</h2>
    {{ userInfo?.name }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
const msg = ref("Hello Vue2.7");
const userInfo = ref(null);
</script>
