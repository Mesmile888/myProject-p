<template>
    <div>
        222
        <!-- <keep-alive>
            <router-view :key="key" v-if="isIframe"></router-view>
        </keep-alive>
        <iframe src = "./" frameborder="0" style="width: 100%;height:50vh;border:0"></iframe> -->
    </div>
</template>
<script lang="ts">
    import { defineComponent, onMounted, ref, watchEffect } from 'vue';
   
    // let iframeUrl = ref("")
    // let isIframe = ref(true);
    export default defineComponent({
        
        
        // setup() {
        //     onMounted(() => {
        //         console.log(1111)
        //     }),
        //     watchEffect(() => {
        //         if (router.currentRoute.value.meta.isIframe) { 
        //             isIframe = router.currentRoute.value.meta.isIframe
        //             iframeUrl = router.currentRoute.value.meta.path
        //          }
        //     })
        // }

    })
</script>