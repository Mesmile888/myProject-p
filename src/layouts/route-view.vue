<template>

  <router-view v-slot="{ Component }" >
    <transition :name="transitionName" appear >
     <div>
      <multi-tab-store-consumer>
        <component  :is="Component"  v-if="Component && !router.currentRoute.value.meta.isIfame"></component>
      </multi-tab-store-consumer>
      <div v-for="item in iframeDemoArr" :key="item.path">
        <!-- 删除判断是否移除dom节点 -->
        <template v-if="!(iframePath==item.path)">
            <div v-show="item.path===$route.path">
              <component :is="temp[`${item.component}`]"></component>
            </div>
        </template>
      </div>
     </div>
    </transition>
  </router-view>

  


</template>

<script lang="ts">
import { useUserStore } from "@/store/user"
import { computed, defineComponent,  nextTick,  ref, watchEffect } from 'vue';
import { MultiTabStoreConsumer } from '@/components/multi-tab';
import { injectMenuState } from './use-menu-state';
import iframeA from '../views/dashboard/iframeDemo/index.vue'
import iframeB from '../views/dashboard/analysis/index.vue'
import router from '@/router';
const iframeDemoArr = ref([])
const iframePath = ref('')
// const tempObj = ref({})
const temp = ref({ iframeA, iframeB })
export default defineComponent({ 
    setup() {
      const menuState = injectMenuState();
      watchEffect(() => {
        if (iframeDemoArr.value.filter((o) => o.path === router.currentRoute.value.path).length === 0 ) { // 如果嵌套iframe页面添加到iframeDemoArr
          // router.currentRoute.value.matched.map(item => {
          //   if (item.path == router.currentRoute.value.path) {
          //     tempObj.value = item.components.default
          //   }
          // })
          iframeDemoArr.value.push({
              path: router.currentRoute.value.path,
              component: router.currentRoute.value.meta.component
          })
        }
        iframePath.value = useUserStore().iframeShow
        // console.log("iframeShow=", useUserStore().iframeShow)
        if(router.currentRoute.value.path == iframePath.value){ 
            nextTick(() => {
              useUserStore().SET_iframeShow(null) // 切换不移除dom
            })
        }
      })
      return {
        transitionName: computed(() => menuState.transitionName.value),
        menuState,
        iframePath,
        iframeDemoArr,
        router,
        temp
      }
    },
    components: {
      MultiTabStoreConsumer
    }
})



</script>
