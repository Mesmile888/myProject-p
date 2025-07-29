/**
*
*/
<template>
  <a-upload
    v-bind="$attrs"
    :action="uploadData.url"
    list-type="picture"
    class="upload-list-inline"
    v-on="$listeners"
    multiple
    @change="changeFile"

  >
    <a-button>
      <upload-outlined></upload-outlined>
      upload
    </a-button>
  </a-upload>
</template>

<script lang="ts" setup>
const props = defineProps({

})
const  uploadData = {
  url: '/demo',
  extData: {},
  headers: ''
}
const changeFile = (option)=>{
  console.log(option)
}
</script>

<style scoped lang="less">
.upload-list-inline :deep(.ant-upload-list-item) {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline [class*='-upload-list-rtl'] :deep(.ant-upload-list-item) {
  float: right;
}
</style>