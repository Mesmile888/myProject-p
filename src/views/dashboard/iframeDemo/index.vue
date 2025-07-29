<template>
  <div>
    Num{{ Num }} "Num1"{{ Num1 }}
    <button @click="handleClick">增加</button>
    <iframe :src="iframeUrl" style="width: 100%; height: 60vh; border: 0" frameborder="0"></iframe>
    <a-input v-model="tempValue"></a-input>
    <fullDate
      v-model:openfull="openfull"
      :tempTitle="tempTitle"
      v-if="openfull"
      :tempId="tempId"
    ></fullDate>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue';
import fullDate from '../fullDate/index';
const iframeUrl = ref('https://kf.qq.com/faq/120911VrYVrA15091832Qzqq.html?scene_id=kf3384');
const tempValue = ref(0);
const openfull = ref(false);
const tempTitle = ref('排班列表');
const tempId = ref('');
const handleClick = () => {
  let aa = 11;
  console.log('aa', aa);
  tempId.value = '123';
  openfull.value = true;
};

let Num = reactive({ val: 0 });
let Num1 = ref(0);
const sWatch = watchEffect(() => {
  if (Num1.value > 10) {
    sWatch();
  }
});
const add = () => {
  Num1.value++;
  Num.val++;
};
// components: {
//   FullList,
//   MyDialog,
//   MultiTabStoreConsumer
// }
</script>