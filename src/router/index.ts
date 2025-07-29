import type { Component } from 'vue';
import { defineAsyncComponent, h } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import type { MenuDataItem } from './typing';
import Layout from '@/layouts/index.vue';
// import UserLayout from '@/layouts/user-layout.vue';
import UserLayout2 from '@/layouts/user-layout2.vue';
import RouteView from '@/layouts/route-view.vue';

const AsyncWorkplace = defineAsyncComponent(
  () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/workplace/index.vue'),
);
export const routes: MenuDataItem[] = [
  {
    name: 'index',
    path: '/',
    redirect: '/workplace',
    component: Layout,
    children: [
      {
        path: '/workplace',
        name: 'Workplace',
        meta: {
          icon: 'HistoryOutlined',
          title: 'pages.dashboard.workplace.title',
          lock: true,
          hideInBreadcrumb: true,
        },
        component: () : Component =>
          import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/workplace/index.vue'),

        // component: h(RouteView, null, () => h(AsyncWorkplace)),
      },
      // {
      //   name: 'newworkplace',
      //   path: '/newworkplace',
      //   meta: { icon: 'HeartOutlined', title: '工作台分析页' },
      //   component: RouteView,
      //   redirect: '/workplace/workplace',
      //   children: [
      //     // {
      //     //   path: '/workplace/workplace',
      //     //   name: 'newworkplace',
      //     //   meta: { icon: 'HistoryOutlined', title: '工作台' },
      //     //   component: (): Component =>
      //     //     import(/* webpackChunkName: "dashboard" */ '@/views/newworkplace/Workplace.vue'),
      //     // },
      //     {
      //       path: '/workplace/welcome',
      //       name: 'newwelcome',
      //       meta: { icon: 'HistoryOutlined', title: '欢迎页' },
      //       component: (): Component =>
      //         import(/* webpackChunkName: "dashboard" */ '@/views/newworkplace/Welcome.vue'),
      //     },

      //   ],
      // },
      {
        name: 'setting',
        path: '/account-set',
        meta: { icon: 'HeartOutlined', title: '个人设置' },
        component: RouteView,
        redirect: '/account/set',
        children: [
          {
            path: '/account/set',
            name: 'setting',
            meta: { icon: 'HistoryOutlined', title: '个人设置' },
            component: (): Component =>
              import(/* webpackChunkName: "dashboard" */ '@/views/account-setting/account-setting.vue'),
          },

        ],
      },
      // {
      //   name: 'demo',
      //   path: '/demo',
      //   meta: { icon: 'HeartOutlined', title: 'demo' },
      //   component: RouteView,
      //   redirect: '/demo/demo',
      //   children: [
      //     {
      //       path: '/demo/demo',
      //       name: 'demo',
      //       meta: { icon: 'HistoryOutlined', title: 'demo' ,keepAlive:false},
      //       component: (): Component =>
      //         import(/* webpackChunkName: "dashboard" */ '@/views/demo/index.vue'),
      //     },

      //     {
      //       path: '/setRoute',
      //       name: 'setRoute',
      //       meta: { icon: 'HistoryOutlined', title: '路由配置' },
      //       component: (): Component =>
      //         import(/* webpackChunkName: "dashboard" */ '@/views/demo/set-route.vue'),
      //     },
      //     {
      //       path: '/table',
      //       name: 'table',
      //       meta: { icon: 'TableOutlined', title: 'table-jsmodel' },
      //       component: (): Component =>
      //         import(/* webpackChunkName: "dashboard" */ '@/views/demo/table.vue'),
      //     },
      //     {
      //       path: '/exp',
      //       name: 'exp',
      //       meta: { icon: 'TableOutlined', title: 'exp' },
      //       component: (): Component =>
      //         import(/* webpackChunkName: "dashboard" */ '@/views/demo/exp.vue'),
      //     },
      //     {
      //       path: '/select',
      //       name: 'select',
      //       meta: { icon: 'TableOutlined', title: 'select' },
      //       component: (): Component =>
      //         import(/* webpackChunkName: "dashboard" */ '@/views/demo/select.vue'),
      //     }, {
      //       path: '/datarang',
      //       name: 'datarang',
      //       meta: { icon: 'TableOutlined', title: '日期选择器' },
      //       component: (): Component =>
      //         import(/* webpackChunkName: "dashboard" */ '@/views/demo/daterang.vue'),
      //     },

      //   ],
      // },
      // {
      //   name: 'rule',
      //   path: '/resource/rule',
      //   meta: { icon: 'HeartOutlined', title: '规则设置' },
      //   component: RouteView,
      //   redirect: '/resource/rule',
      //   children: [
      //     {
      //       path: '/resource2/rule',
      //       name: 'rule-manage',
      //       meta: { icon: 'HistoryOutlined', title: '规则配置',target:'_blank' },
      //       component: (): Component =>
      //         import(/* webpackChunkName: "dashboard" */ '@/views/resource2/rule-manage.vue'),
      //     },
      //     {
      //       path: '/resource2/add',
      //       name: 'target-add',
      //       meta: { icon: 'HistoryOutlined', title: '新增指标',target:'_blank' },
      //       component: (): Component =>
      //         import(/* webpackChunkName: "dashboard" */ '@/views/resource2/add-target.vue'),
      //     },
      //   ]
      // },
      {
        name: 'resource',
        path: '/resource',
        meta: { icon: 'HeartOutlined', title: '资源录入资源录入资源录入资源录入资源录入' },
        component: RouteView,
        redirect: '/demo/demo',
        children: [
          // {
          //   path: '/resource/enter',
          //   name: 'enter-resource',
          //   meta: { icon: 'HistoryOutlined', title: '资源录入',target:'_blank' },
          //   component: (): Component =>
          //     import(/* webpackChunkName: "dashboard" */ '@/views/resource/enter-resource.vue'),
          // },

          // {
          //   path: '/resourceList',
          //   name: 'resource-list',
          //   meta: { icon: 'HistoryOutlined', title: '资源列表' },
          //   component: (): Component =>
          //     import(/* webpackChunkName: "dashboard" */ '@/views/resource/resource-list.vue'),
          // },
          // {
          //   path: '/voucherList',
          //   name: 'resource-voucher-list',
          //   meta: { icon: 'HistoryOutlined', title: '资源凭证列表资' },
          //   component: (): Component =>
          //     import(/* webpackChunkName: "dashboard" */ '@/views/resource/resource-voucher-list.vue'),
          // },
          // {
          //   path: '/taskList',
          //   name: 'taskList',
          //   meta: { icon: 'HistoryOutlined', title: '任务列表' },
          //   component: (): Component =>
          //     import(/* webpackChunkName: "dashboard" */ '@/views/resource/task-list.vue'),
          // }

        ],
      },
      // {
      //   name: 'detail',
      //   path: '/detail',
      //   /*hideInMenu: true,
      //   hideChildrenInMenu: true,*/
      //   meta: { icon: 'HeartOutlined', title: '详情',hideInMenu: true,},
      //   component: RouteView,
      //   redirect: '/demo/detail',
      //   children: [
      //     {
      //       path: '/demo/detail',
      //       name: 'detail',
      //       meta: { icon: 'HistoryOutlined', title: '详情1' },
      //       component: (): Component =>
      //         import(/* webpackChunkName: "dashboard" */ '@/views/demo/common/detail.vue'),
      //     }

      //   ],
      // },
      // {
      //   name: 'edit',
      //   path: '/edit',
      //   /*hideInMenu: true,
      //   hideChildrenInMenu: true,*/
      //   meta: { icon: 'HeartOutlined', title: '编辑信息',hideInMenu: true,},
      //   component: RouteView,
      //   redirect: '/demo/edit',
      //   children: [
      //     {
      //       path: '/demo/edit',
      //       name: 'edit',
      //       meta: { icon: 'HistoryOutlined', title: '编辑' },
      //       component: (): Component =>
      //         import(/* webpackChunkName: "dashboard" */ '@/views/demo/common/edit.vue'),
      //     }

      //   ],
      // },
      // dashboard
      {
        name: 'Dashboard',
        path: '/dashboard',
        meta: { icon: 'HeartOutlined', title: 'pages.dashboard.title' },
        component: RouteView,
        redirect: '/dashboard/welcome',
        children: [
          {
            path: '/dashboard/welcome',
            name: 'welcome',
            meta: { icon: 'HistoryOutlined', title: 'pages.dashboard.welcome.title' ,welcome:true },
            component: (): Component =>
              import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/workplace2/index.vue'),
          },
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            meta: { icon: 'HeartOutlined', title: 'pages.dashboard.analysis.title', isIfame: true, component: "iframeB", },  // 添加标识 isIframe为true时代表是iframe嵌套页面
            component: (): Component =>
              import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/analysis/index.vue'),
          },
          {
            path: '/dashboard/monitor',
            name: 'Monitor',
            meta: { icon: 'HeartOutlined', title: 'pages.dashboard.monitor.title' },
            component: (): Component =>
              import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/monitor/index.vue'),
          },
          {
            path: '/dashboard/iframeDemo',
            name: 'iframeDemo',
            meta: { icon: 'HeartOutlined', title: 'pages.dashboard.iframeDemo.title', isIfame: true, component: "iframeA", },
            component: (): Component =>
              import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/iframeDemo/index.vue'),
          },
          {
            path: '/dashboard/fullDate',
            name: 'fullDate',
            meta: { icon: 'HeartOutlined', title: 'pages.dashboard.fullDate.title' },
            component: (): Component =>
              import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/fullDate/index.vue'),
          },
          {
            path: '/dashboard/mapMark',
            name: 'mapMark',
            meta: { icon: 'HeartOutlined', title: 'pages.dashboard.mapMark.title' },
            component: (): Component =>
              import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/mapMark/index7.vue'),
          },
          {
            path: '/dashboard/yulanPdf',
            name: 'yulanPdf',
            meta: { icon: 'HeartOutlined', title: 'pages.dashboard.yulanPdf.title' },
            component: (): Component =>
              import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/yulanPdf/index.vue'),
          },
        ],
      },

      // form
      {
        path: '/form',
        name: 'form',
        meta: {
          title: 'pages.form.title',
          icon: 'FormOutlined',
          authority: 'form',
        },
        component: RouteView,
        redirect: '/form/basic-form',
        children: [
          {
            path: '/form/basic-form',
            name: 'basic-form',
            meta: { title: 'form.basicform.basic.title', keepAlive: true },
            component: (): Component =>
              import(/* webpackChunkName: "form" */ '@/views/form/basic-form/index.vue'),
          },
          {
            path: '/form/step-form',
            name: 'step-form',
            meta: { title: 'form.stepform.basic.title' },
            component: (): Component =>
              import(/* webpackChunkName: "form" */ '@/views/form/step-form/index.vue'),
          },
          {
            path: '/form/advanced-form',
            name: 'advanced-form',
            meta: { title: 'form.advancedform.basic.title' },
            component: (): Component =>
              import(/* webpackChunkName: "form" */ '@/views/form/advance-form/index.vue'),
          },
        ],
      },

      // list
      {
        path: '/list',
        name: 'list',
        meta: { title: 'pages.list.title', icon: 'TableOutlined' },
        component: RouteView,
        redirect: '/list/table-list',
        children: [
          {
            path: '/list/table-list',
            name: 'table-list',
            meta: { title: 'pages.list.tablelist.title' },
            component: (): Component =>
              import(/* webpackChunkName: "list" */ '@/views/list/table-list/index.vue'),
          },
          {
            path: '/list/basic-list',
            name: 'basic-list',
            meta: { title: 'pages.list.basiclist.title' },
            component: (): Component =>
              import(/* webpackChunkName: "list" */ '@/views/list/basic-list/index.vue'),
          },
          {
            path: '/list/card-list',
            name: 'card-list',
            meta: { title: 'pages.list.cardlist.title' },
            component: (): Component =>
              import(/* webpackChunkName: "list" */ '@/views/list/card-list/index.vue'),
          },
        ],
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        meta: { title: 'pages.profile.title', icon: 'UnorderedListOutlined' },
        component: RouteView,
        redirect: '/profile/basic',
        children: [
          {
            path: '/profile/basic',
            name: 'profile-basic',
            meta: {
              title: 'pages.profile.basic.title',
              // collapsedIcon: 'UnorderedListOutlined',
            },
            component: () =>
              import(/* webpackChunkName: "profile" */ '@/views/profile/basic/index.vue'),
          },
          {
            path: '/profile/advanced',
            name: 'profile-advanced',
            meta: {
              title: 'pages.profile.advanced.title',
              // collapsedIcon: 'UnorderedListOutlined',
            },
            component: () =>
              import(/* webpackChunkName: "profile" */ '@/views/profile/advanced/index.vue'),
          },
        ],
      },

      // exception
      {
        name: 'exception',
        path: '/exception',
        meta: { title: 'pages.exception.title', icon: 'WarningOutlined' },
        component: RouteView,
        redirect: '/exception/403',
        children: [
          {
            name: 'exception403',
            path: '/exception/403',
            meta: { title: 'pages.exception.403.title' },
            component: () =>
              import(/* webpackChunkName: "exception" */ '@/views/exception/403.vue'),
          },
          {
            name: 'exception404',
            path: '/exception/404',
            meta: { title: 'pages.exception.404.title' },
            component: () =>
              import(/* webpackChunkName: "exception" */ '@/views/exception/404.vue'),
          },
          {
            name: 'exception500',
            path: '/exception/500',
            meta: { title: 'pages.exception.500.title' },
            component: () =>
              import(/* webpackChunkName: "exception" */ '@/views/exception/500.vue'),
          },
        ],
      },

      // result
      {
        name: 'result',
        path: '/result',
        meta: { title: 'pages.result.title', icon: 'CheckCircleOutlined' },
        component: RouteView,
        redirect: '/result/success',
        children: [
          {
            name: 'result-success',
            path: '/result/success',
            meta: { title: 'pages.result.success.title' },
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/success.vue'),
          },
          {
            name: 'result-fail',
            path: '/result/fail',
            meta: { title: 'pages.result.fail.title' },
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/fail.vue'),
          },
        ],
      },

      {
        name: 'account',
        path: '/account',
        meta: { title: 'pages.account.title', icon: 'AppstoreAddOutlined' },
        component: RouteView,
        redirect: '/account/center',
        children: [
          {
            name: 'AccountCenter',
            path: '/account/center',
            meta: { title: 'pages.account.center.title' },
            component: () =>
              import(/* webpackChunkName: "account" */ '@/views/account/center/index.vue'),
          },
          {
            name: 'AccountSettings',
            path: '/account/settings',
            meta: {
              title: 'pages.account.settings.title',
              hideChildrenInMenu: true,
              mergeTab: true,
            },
            redirect: '/account/settings/base',
            component: () =>
              import(/* webpackChunkName: "account" */ '@/views/account/settings/index.vue'),
            children: [
              {
                name: 'BaseSettings',
                path: '/account/settings/base',
                meta: { title: 'pages.account.settings.base.title' },
                component: () =>
                  import(
                    /* webpackChunkName: "account" */ '@/views/account/settings/pages/base.vue'
                  ),
              },
              {
                name: 'SecuritySettings',
                path: '/account/settings/security',
                meta: { title: 'pages.account.settings.security.title' },
                component: () =>
                  import(
                    /* webpackChunkName: "account" */ '@/views/account/settings/pages/security.vue'
                  ),
              },
              {
                name: 'CustomSettings',
                path: '/account/settings/custom',
                meta: { title: 'pages.account.settings.custom.title' },
                component: () =>
                  import(
                    /* webpackChunkName: "account" */ '@/views/account/settings/pages/custom.vue'
                  ),
              },
              {
                name: 'BindingSettings',
                path: '/account/settings/binding',
                meta: { title: 'pages.account.settings.binding.title' },
                component: () =>
                  import(
                    /* webpackChunkName: "account" */ '@/views/account/settings/pages/binding.vue'
                  ),
              },
              {
                name: 'NotificationSettings',
                path: '/account/settings/notification',
                meta: { title: 'pages.account.settings.notification.title' },
                component: () =>
                  import(
                    /* webpackChunkName: "account" */ '@/views/account/settings/pages/notification.vue'
                  ),
              },
            ],
          },
        ],
      },

      // system
      {
        path: '/system',
        name: 'system',
        meta: { title: 'pages.system.title', icon: 'TableOutlined' },
        component: RouteView,
        redirect: '/system/role-list',
        children: [
          {
            path: '/system/role-list',
            name: 'role-list',
            meta: { title: 'pages.system.role-list.title' },
            component: (): Component =>
              import(/* webpackChunkName: "system" */ '@/views/system/role-list.vue'),
          },
          {
            path: '/system/permission-list',
            name: 'permission-list',
            meta: { title: 'pages.system.permission-list.title' },
            component: (): Component =>
              import(/* webpackChunkName: "system" */ '@/views/system/permission-list.vue'),
          },
        ],
      },

      // jump url
      {
        path: '/jump-url',
        name: 'jumpUrl',
        meta: { title: 'pages.jumpUrl.title', icon: 'LinkOutlined' },
        component: RouteView,
        redirect: '/jump-url/router',
        children: [
          {
            path: '/jump-url/router',
            name: 'jumpUrlExamples',
            meta: { title: 'pages.jumpUrl.router.title' },
            component: (): Component =>
              import(/* webpackChunkName: "jumpUrl" */ '@/views/examples/jump-url/index.vue'),
          },
          {
            path: 'https://github.com/vueComponent/ant-design-vue',
            name: 'github',
            meta: {
              title: 'pages.jumpUrl.github.title',
              target: '_blank',
            },
            component: () => null,
          },
        ],
      },

      // examples
      {
        name: 'examples',
        path: '/examples',
        meta: { title: 'pages.examples.title', icon: 'AppstoreAddOutlined' },
        component: RouteView,
        redirect: '/examples/button',
        children: [
          {
            name: 'SurelyVueExample',
            path: '/examples/surely-vue',
            meta: {
              title: 'pages.examples.surely-vue.title',
              // collapsedIcon: 'AppstoreAddOutlined',
            },
            component: () =>
              import(/* webpackChunkName: "examples" */ '@/views/examples/surely-vue/index.vue'),
          },
          {
            name: 'ButtonExample',
            path: '/examples/button',
            meta: {
              title: 'pages.examples.button.title',
              // collapsedIcon: 'AppstoreAddOutlined',
            },
            component: () =>
              import(/* webpackChunkName: "examples" */ '@/views/examples/button/index.vue'),
          },
          {
            name: 'InputExample',
            path: '/examples/input',
            meta: {
              title: 'pages.examples.input.title',
              // collapsedIcon: 'AppstoreAddOutlined',
            },
            component: () =>
              import(/* webpackChunkName: "examples" */ '@/views/examples/input/index.vue'),
          },
          {
            name: 'RateExample',
            path: '/examples/rate',
            meta: {
              title: 'pages.examples.rate.title',
              // collapsedIcon: 'AppstoreAddOutlined',
            },
            component: () =>
              import(/* webpackChunkName: "examples" */ '@/views/examples/rate/index.vue'),
          },
          {
            name: 'PermissionExample',
            path: '/examples/permission',
            meta: {
              title: 'pages.examples.authority.title',
              // collapsedIcon: 'AppstoreAddOutlined',
            },
            component: () =>
              import(/* webpackChunkName: "examples" */ '@/views/examples/authority/index.vue'),
          },
        ],
      },

      {
        name: 'nested',
        path: '/nested',
        meta: { title: 'pages.nested.title', icon: 'AppstoreAddOutlined' },
        component: RouteView,
        redirect: '/nested/menu1',
        children: [
          {
            name: 'nested-menu1',
            path: '/nested/menu1',
            // 由于 vuerouter 问题，三级路由开启 keepalive 会导致组件多次 setup
            meta: { title: 'pages.nested.menu1.title', keepAlive: false },
            component: () =>
              import(/* webpackChunkName: "nested" */ '@/views/examples/nested/menu1.vue'),
            // 使用分割菜单时，你应该重定向到一个有权限的路由，避免 404
            redirect: '/nested/menu1/menu1-1',
            children: [
              {
                name: 'nested-menu1-1',
                path: '/nested/menu1/menu1-1',
                meta: { title: 'pages.nested.menu1-1.title' },
                component: () =>
                  import(/* webpackChunkName: "nested" */ '@/views/examples/nested/menu1-1.vue'),
              },
              {
                name: 'nested-menu1-2',
                path: '/nested/menu1/menu1-2',
                meta: { title: 'pages.nested.menu1-2.title', keepAlive: false },
                redirect: '/nested/menu1/menu1-2/menu1-2-1',
                component: () =>
                  import(/* webpackChunkName: "nested" */ '@/views/examples/nested/menu1-2.vue'),
                children: [
                  {
                    name: 'nested-menu1-2-1',
                    path: '/nested/menu1/menu1-2/menu1-2-1',
                    meta: { title: 'pages.nested.menu1-2-1.title' },
                    component: () =>
                      import(
                        /* webpackChunkName: "nested" */ '@/views/examples/nested/menu1-2-1.vue'
                      ),
                  },
                ],
              },
            ],
          },
          {
            name: 'nested-menu2',
            path: '/nested/menu2',
            meta: { title: 'pages.nested.menu2.title' },
            component: () =>
              import(/* webpackChunkName: "nested" */ '@/views/examples/nested/menu2.vue'),
          },
          {
            name: 'nested-menu3',
            path: '/nested/menu3',
            meta: { title: 'pages.nested.menu3.title', hideChildrenInMenu: true, keepAlive: false },
            redirect: '/nested/menu3/menu3-1',
            component: () =>
              import(/* webpackChunkName: "nested" */ '@/views/examples/nested/menu3.vue'),
            children: [
              {
                name: 'nested-menu3-1',
                path: '/nested/menu3/menu3-1',
                meta: { title: 'pages.nested.menu3-1.title' },
                component: () =>
                  import(/* webpackChunkName: "nested" */ '@/views/examples/nested/menu3-1.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
];

export const staticRoutes: MenuDataItem[] = [
  {
    path: '/test',
    name: 'test',
    meta: { title: 'form.basicform.basic.title' },
    component: (): Component =>
      import(/* webpackChunkName: "other" */ '@/views/form/basic-form/index.vue'),
  },
  {
    path: '/user',
    name: 'user',
    meta: { hideInMenu: true, title: 'pages.layouts.userLayout.title' },
    component: UserLayout2,
    children: [
      {
        path: '/user/login',
        name: 'login',
        meta: { title: 'pages.login.accountLogin.tab' },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/login.vue'),
      },
      {
        path: '/user/register',
        name: 'register',
        meta: { title: 'pages.login.registerAccount' },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/register.vue'),
      },
      {
        path: '/user/register-result',
        name: 'register-result',
        meta: { title: 'pages.login.registerAccount' },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/register-result.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import(/* webpackChunkName: "exception" */ '@/views/exception/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes: staticRoutes as RouteRecordRaw[],
  scrollBehavior: (to, from) => {
    if (to.path !== from.path) {
      setTimeout(() => {
        document.getElementById('app').scrollTop = 0;
      });
    }
    return { top: 0 };
  },
});

export default router;
