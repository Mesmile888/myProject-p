<template>
  <a-watermark v-bind="watermarkModel" :disabled="false">
    <left-menu-layout key="leftmenu-layout" v-if="layout === 'left'">
      <slot />
    </left-menu-layout>
    <basic-layout key="basic-layout" v-else><slot /></basic-layout>
  </a-watermark>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue';
import BasicLayout from './basic-layout.vue';
import LeftMenuLayout from './leftmenu-layout.vue';
import { injectMenuState } from './use-menu-state';
import { default as WaterMark } from '@/components/watermark/index.vue';

export default defineComponent({
  name: 'GlobalLayout',

  setup() {
    const watermarkModel = reactive(
      {
        content: 'nickname+phone.substr(phone.length - 4,4)',

      }
    )
    return {
      watermarkModel,
      ...injectMenuState(),
    };
  },
  components: {
    BasicLayout,
    LeftMenuLayout,
    WaterMark,
  },
});
</script>
