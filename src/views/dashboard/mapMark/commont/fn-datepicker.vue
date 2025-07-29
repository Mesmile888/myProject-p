/**
*日期多选组件
*/
<template>
  <VueDatePicker
    v-model="date"
    :multi-dates="multiple"
    :format="format"
    locale="zh-cn"
    :select-text="selectText"
    :cancel-text="cancelText"
    :day-names="['一','二','三','四','五','六','七']"
    :enable-time-picker="false"
    @update:model-value="handleDate"
  ></VueDatePicker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ja } from 'date-fns/locale';
import { multiply } from 'lodash-es';
/**更详细的配置可参照官方文档https://vue3datepicker.com/**/
const props = defineProps({
  multiple: {
    type: Boolean,
    default: true
  },
  format: {
    type: String,
    default: 'yyyy-MM-dd'
  },
  selectText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  dayNames: {
    type: Array,
    default: function (){
      return ['一','二','三','四','五','六','七']
    }
  },
  modelType: {
    type: String,
    default : 'yyyy-mm-dd'
  }
})
const emits = defineEmits(['change'])
const date = props.multiple?ref([]):ref()
/**父组件用v-model绑定对应表单字段即可  也可调用change方法接收选择的值,传值为国际时间格式，父组件需要用daijs转换为自己需要的时间格式**/
const handleDate = (v)=>{
  date.value = v
  emits('change',date.value)
}
</script>

<style scoped lang="less">
/**隐藏底部选择预览dom**/
:deep(.dp__selection_preview){
  display: none;
}
</style>