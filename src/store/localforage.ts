import localforage from 'localforage';
import { acceptHMRUpdate, defineStore } from 'pinia';
localforage.config({
  driver: localforage.INDEXEDDB, // 选择存储引擎，如IndexedDB
  name: 'my-app', // 数据库名称
  version: 1, // 数据库版本号
  storeName: 'my-store', // 存储对象的名称
})

export const localforageStore = defineStore('indexDb',{
  state:() => {
    return {
      checkList : [],
      checkListName: null
    }
  },
  actions: {
    setCheck(checkList){
      this.checkList = checkList;
      localforage.setItem(this.checkListName+'checkList',checkList)
    },
    setCheckListName(checkListName){
      this.checkListName = checkListName
    },
    getCheck(){
      localforage.getItem(this.checkListName+'checkList').then((checkList)=>{
       return this.checkList
      })
    }
  },
})



