<template>
<!--  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>-->
  <a-style-provider :hash-priority="hashPriority">
    <a-config-provider :locale="locale" :theme="themeConfig">
      <site-token>
        <router-view />
      </site-token>
    </a-config-provider>
  </a-style-provider>
</template>

<script lang="ts" setup>
/*import { computed, provide, watch } from 'vue';*/
import SiteToken from './components/site-token.vue';
import { computed, provide, ref, watch } from 'vue';
import { theme as antdTheme } from 'ant-design-vue';
import { STORAGE_LANG_KEY, useAppStore } from '@/store/app';
import { localStorage } from '@/utils/local-storage';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import { useI18n } from 'vue-i18n';
import useMenuState, { MenuStateSymbol } from './layouts/use-menu-state';
import { useMultiTabStateProvider } from './components/multi-tab';
import { defaultLang } from './locales';
//import type { ConfigProviderProps } from 'ant-design-vue/lib/config-provider';
import type { ConfigProviderProps } from 'ant-design-vue';

const i18n = useI18n();
const appStore = useAppStore();
const multiTabState = useMultiTabStateProvider();
const colSize = useMediaQuery();
const isMobile = computed(() => colSize.value === 'sm' || colSize.value === 'xs');
const menuState = useMenuState(
  {
    collapsed: isMobile.value,
    openKeys: [] as string[],
    selectedKeys: [] as string[],
    isMobile,
  },
  multiTabState,
);
const lang = localStorage.get(STORAGE_LANG_KEY, defaultLang);
if (lang) {
  appStore.SET_LANG(lang);
}
const hashPriority = ref('low' as const);
watch(hashPriority, () => {
  location.reload();
});
export type ThemeName = '' | 'light' | 'dark' | 'compact';
const getAlgorithm = (themes: ThemeName[] = []) =>
  themes
    .filter(theme => !!theme)
    .map(theme => {
      if (theme === 'dark') {
        return antdTheme.darkAlgorithm;
      }
      if (theme === 'compact') {
        return antdTheme.compactAlgorithm;
      }
      return antdTheme.defaultAlgorithm;
    });
const themeConfig = computed(() => {
  /*return { algorithm: getAlgorithm(['light']) };*/
  return {
    algorithm: getAlgorithm(['light']),
    token: { colorPrimary: appStore.primaryColor, colorInfo: appStore.primaryColor },
  };
});
const theme = computed(() => appStore.navTheme);
watch(
  theme,
  () => {
    if (theme.value === 'realDark') {
      document
        .getElementsByTagName('html')[0]
        .setAttribute('data-pro-theme', 'antdv-pro-theme-dark');
    } else {
      document
        .getElementsByTagName('html')[0]
        .setAttribute('data-pro-theme', 'antdv-pro-theme-light');
    }
  },
  { immediate: true },
);
provide('isMobile', isMobile);
provide(
  'isRealDark',
  computed(() => theme.value === 'realDark'),
);
provide(MenuStateSymbol, menuState);
const locale = computed(() => {
  return i18n.getLocaleMessage(i18n.locale.value).antd as ConfigProviderProps['locale'];
});
</script>
