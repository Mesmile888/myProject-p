/*import 'ant-design-vue/dist/antd.variable.less';*/
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue/es';
import '@surely-vue/table/dist/index.less';
import { setLicenseKey } from '@surely-vue/table';
import GoEasy from 'goeasy'
setLicenseKey('f2982a540e64ef168643af2b97a31958T1JERVI6MTAwMDYzLEVYUElSWT0xNzMzMDExMjAwMDAwLERPTUFJTj01MWx4LmNvbSxVTFRJTUFURT0wLEtFWVZFUlNJT049MQ==');
import {
  StyleProvider,
  Layout,
  Menu,
  Row,
  Col,
  Card,
  Form,
  Dropdown,
  Select,
  Button,
  Checkbox,
  Tabs,
  Tag,
  Input,
  DatePicker,
  TimePicker,
  Radio,
  Tooltip,
  Space,
  Steps,
  Divider,
  Descriptions,
  Alert,
  Result,
  Statistic,
  Popconfirm,
  Popover,
  Table,
  Avatar,
  List,
  Progress,
  Switch,
  Modal,
  Rate,
  ConfigProvider,
  Empty,
  Spin,
  Drawer,
  PageHeader,
  Carousel,
  FloatButton,
  Upload,
  Tree,
  Timeline,
  Cascader,
  Badge,
  Collapse,
} from 'ant-design-vue/es';
import STable from '@surely-vue/table';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import router from './router';
import locale from './locales';
import App from './App.vue';

import { ProProvider, PageContainer, TransformVnode } from '@/components';
import { useIcons } from '@/icons';
import Authority from './utils/authority/authority.vue';
import './app.less';
import './router/router-guards';
import dayjs from 'dayjs';
import * as Icons from '@ant-design/icons-vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import  localforage from 'localforage'

localforage.config({
  driver: localforage.INDEXEDDB, // 选择存储引擎，如IndexedDB
  name: 'my-app', // 数据库名称
  version: 1, // 数据库版本号
  storeName: 'my-store', // 存储对象的名称
})
dayjs.extend(relativeTime);
const app = createApp(App);
const pinia = createPinia();
const goEasy = GoEasy.getInstance({
  host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
  appkey: 'BC-c7c5e8422fd842b5a0bf5376475b26ac', // common key,
  modules: ['pubsub'],
});

pinia.use(piniaPluginPersistedstate);
app.provide('goEasy', goEasy);
app.use(pinia);
app
 
  .use(router)
  .use(localforage)
  .use(locale)
  .use(STable)
  .use(Layout)
  .use(Menu)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Form)
  .use(Dropdown)
  .use(Select)
  .use(Button)
  .use(Checkbox)
  .use(Tabs)
  .use(Tag)
  .use(Input)
  .use(DatePicker)
  .use(TimePicker)
  .use(Radio)
  .use(Tooltip)
  .use(Space)
  .use(Steps)
  .use(Divider)
  .use(Descriptions)
  .use(Alert)
  .use(Result)
  .use(Statistic)
  .use(Popconfirm)
  .use(Popover)
  .use(Table)
  .use(Avatar)
  .use(List)
  .use(Progress)
  .use(Switch)
  .use(Modal)
  .use(Rate)
  .use(ConfigProvider)
  .use(Empty)
  .use(Spin)
  .use(Drawer)
  .use(PageHeader)
  .use(ProProvider)
  .use(Badge)
  .use(Carousel)
  .use(FloatButton)
  .use(Upload)
  .use(Cascader)
  .use(Timeline)
  .use(Tree)
  .use(Collapse)
  .use(StyleProvider)
  .use(Antd)
  .component(PageContainer.name, PageContainer)
  .component(TransformVnode.name, TransformVnode)
  .component(Authority.name, Authority);

useIcons(app);
app.config.productionTip = false;
app.config.silent = true
app.mount('#app');
const icons: any = Icons;
for (const i in icons) {
  app.component(i, icons[i]);
}
app.config.globalProperties.$Icons = Icons;