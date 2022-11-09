import {defineStore} from 'pinia';
const useMainStore = defineStore('main',{
  state:()=>({
    count:0
  }),
  actions: {
    increment(){
      this.count++;
    }
  },
  getters:{}
})

export {useMainStore};