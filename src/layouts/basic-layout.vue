<template>
  <pro-provider :content-width="contentWidth">
    <a-layout class="ant-pro-basicLayout">
      <template v-if="isMobile">
        <a-drawer
          :bodyStyle="{ padding: 0, height: '100%' }"
          placement="left"
          :width="sideWidth"
          :closable="false"
          :visible="!collapsed"
          @update:visible="updateCollapsed"
        >
          <sider-menu
            style="height: 100%"
            :theme="theme"
            :layout="layout"
            :fixed="fixedSidebar"
            :menus="menus"
            :sider-width="sideWidth"
            :split-menus="false"
            :collapsed-button="false"
            :collapsed="false"
            v-model:open-keys="openKeys"
            v-model:selected-keys="selectedKeys"
          />
        </a-drawer>
      </template>
      <sider-menu
        v-else-if="!hasTopMenu"
        :theme="theme"
        :layout="layout"
        :fixed="fixedSidebar"
        :menus="menus"
        :sider-width="sideWidth"
        :split-menus="splitMenus"
        :collapsed-button="!splitMenus"
        v-model:collapsed="collapsed"
        v-model:open-keys="openKeys"
        v-model:selected-keys="selectedKeys"
      />
      <a-layout>
        <header-view
          :theme="theme"
          :layout="layout"
          :menus="menus"
          :sider-width="sideWidth"
          :has-sider-menu="hasSideMenu"
          :fixed-header="fixedHeader"
          :split-menus="splitMenus"
          v-model:collapsed="collapsed"
          v-model:open-keys="openKeys"
          v-model:selected-keys="selectedKeys"
        >
          <div style="text-align: right">
            <notice-icon />
            <avatar-dropdown :current-user="currentUser" />
            <SettingOutlined style="cursor: pointer" @click="showSetDrawer"/>
          </div>
        </header-view>
        <multi-tab-vue v-if="multiTab" :fixed="multiTabFixed" :sider-width="sideWidth" />
        <router-view v-slot="{ Component }">
          <wrap-content>
            <component :is="Component"></component>
          </wrap-content>
        </router-view>
        <global-footer />
      </a-layout>
    </a-layout>
    <setting-drawer v-if="setVisible"/>
<!--    <div style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,.5);z-index: 99999">
      <img style="width: 400px;height: 250px;position: absolute;top: 150px;left: 40%" src="https://img1.baidu.com/it/u=1957464558,1003400563&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500" alt="">
      <span style="position: absolute;right: 40px;top: 40px"><CloseCircleFilled style="font-size: 40px"/></span>
    </div>-->
  </pro-provider>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { genMenuInfo } from '@/utils/menu-util';
import { default as WrapContent } from '@/components/base-layouts/wrap-content/index.vue';
import { default as GlobalFooter } from '@/components/base-layouts/global-footer/index.vue';
import { default as SiderMenu } from '@/components/base-layouts/sider-menu/index.vue';
import { default as HeaderView } from '@/components/base-layouts/header/index.vue';
import { default as SelectLang } from '@/components/select-lang/index.vue';
import { default as AvatarDropdown } from '@/components/avatar-dropdown.vue';
import { default as SettingDrawer } from '@/components/setting-drawer/index.vue';
import { default as NoticeIcon } from '@/components/notice-icon/index.vue';

import { MultiTab as MultiTabVue } from '@/components/multi-tab';
import { injectMenuState } from './use-menu-state';
import { useAuth } from '@/utils/authority';
import { useUserStore } from '@/store/user';
import { Action } from '@/api/user/login';

export default defineComponent({
  name: 'BasicLayout',
  setup() {
    const setVisible = ref(false)
    const showSetDrawer = ()=>{
      setVisible.value = !setVisible.value
    }
   /* const goEasy = inject('goEasy');
//建立连接
    goEasy.connect({
      onSuccess: function () { //连接成功
        console.log("GoEasy connect successfully13213213.") //连接成功
      },
      onFailed: function (error) { //连接失败
        console.log("Failed to connect GoEasy, code:"+error.code+ ",error:"+error.content);
      }
    });*/
    const userStore = useUserStore();
    const { t } = useI18n();
    const menuState = injectMenuState();
    const isMobile = inject('isMobile', ref(false));
    const currentUser = computed(() => userStore.currentUser);
    const hasSideMenu = computed(
      () => menuState.layout.value === 'side' || menuState.layout.value === 'left',
    );
    const hasTopMenu = computed(() => menuState.layout.value === 'top');
    const hasAuth = useAuth([Action.DELETE, Action.ADD]);
    watch(
      hasAuth,
      () => {
        //console.log('hasAuth', hasAuth.value);
      },
      { immediate: true },
    );
    // gen menus
    const allowRouters = computed(() => userStore.allowRouters); // genMenuInfo(filterMenu(routes)).menus;
    const menus = computed(() => genMenuInfo(allowRouters.value).menus);
    return {
      t,
      currentUser,
      menus,
      ...menuState,
      hasSideMenu,
      hasTopMenu,
      isMobile,
      hasAuth,
      setVisible,
      showSetDrawer
    };
  },
  components: {
    MultiTabVue,
    WrapContent,
    SiderMenu,
    GlobalFooter,
    HeaderView,
    SelectLang,
    AvatarDropdown,
    SettingDrawer,
    NoticeIcon,
  },
});
</script>

<style lang="less">
body {
  @import '../components/base-layouts/basic-layout.less';
}
</style>
