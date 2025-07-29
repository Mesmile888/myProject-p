import { acceptHMRUpdate, defineStore } from 'pinia';
export const busStore = defineStore('bus',{
  state:() => {
    return {
      isComplate : false
    }
  }
})
