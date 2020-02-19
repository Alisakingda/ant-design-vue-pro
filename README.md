# 项目构建

1. 安装 cli
   > npm install -g @vue/cli
2. 初始化项目
   > vue create ant-design-vue-pro
3. 安装 antd-design-vue
   > npm i ant-design-vue --save
4. 配置按需加载
   > npm i babel-plugin-import --save-dev

```js
// 修改根目录的 babel.config.js， 配置 babel-plugin-import
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
};
```

5. 配置 less(主题变化需要)
   > npm i less less-loader --save-dev

```js
// 根目录创建 vue.config.js 文件，配置如下
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};
```

6. 项目启动
   > npm run serve

### ant-design-vue index.js 配置

```js
import Vue from "vue";
import "ant-design-vue/dist/antd.less"; // 引入antd.less样式
import { LocaleProvider, Button, Icon, DatePicker } from "ant-design-vue";

Vue.use(LocaleProvider);
Vue.use(Button);
Vue.use(Icon);
Vue.use(DatePicker);
```

##### 国际化

###### LocaleProvider

ant-design-vue 提供了一个 Vue 组件 LocaleProvider 用于全局配置国际化文案。

```vue
<template>
  <a-locale-provider :locale="locale">
    <App />
  </a-locale-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  data() {
    return {
      locale: zhCN
    };
  }
};
</script>
```

[地址](https://www.antdv.com/docs/vue/i18n-cn/)

### vue-router 配置相关

##### 模块拆分

##### 全局路由守卫

```js
// intercept.js
export default router => {
  // 路由判断登录 根据路由配置文件的参数
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
      // 判断该路由是否需要登录权限
      console.log("需要登录");
      if (localStorage.token) {
        // 判断当前的token是否存在 ； 登录存入的token
        next();
      } else {
        next({
          path: "/",
          query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      }
    } else {
      next();
    }
  });
};
```

### vuex 配置相关

```js
import Vue from "vue";
import Vuex from "vuex";
import chatModule from "./modules/chat/index";
import productsModule from "./modules/products/index";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  // modules: {}
  modules: {
    a: chatModule,
    b: productsModule
  }
  // namespaced: true
});
```

```js
export default {
  namespaced: true,
  state: {
    username: "leon"
  },
  getters: {
    get_username(state) {
      return state.username;
    }
  },
  mutations: {
    set_username(state, payload) {
      state.username = payload;
    }
  },
  actions: {
    set_username({ commit }, payload) {
      commit("set_username", payload);
    }
  }
};
```

### vant 配置相关

1. 安装

```js
npm i vant -S
```

2. 按需加载

```js
module.exports = {
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      },
      "vant"
    ]
  ]
};
```

3. 基础配置

```js
import Vue from "vue";
import "vant/lib/index.css";
import { Button, Icon } from "vant";

Vue.use(Button);
Vue.use(Icon);
```

### 工具 axios 封装

```js
/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import Vue from "vue";
import axios from "axios";
import QS from "qs";
import { Toast } from "vant";
import store from "@/store/index";
import { router } from "vue-router";

Vue.use(Toast);
// 环境的切换
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://www.dev.com";
} else if (process.env.NODE_ENV === "test") {
  axios.defaults.baseURL = "http://www.test.com";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://www.pro.com";
}
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  }
);
// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }, // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (
        error.response.status // 401: 未登录 // 未登录则跳转登录页面，并携带当前页面的路径 // 在登录成功后返回当前页面，这一步需要在登录页操作。
      ) {
        case 401:
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });
          break; // 403 token过期 // 登录过期对用户进行提示 // 清除本地token和清空vuex中token对象 // 跳转登录页面
        case 403:
          Toast("登录过期，请重新登录"); // 清除token
          localStorage.removeItem("token");
          store.commit("loginSuccess", null); // 不太懂的话可不对状态码进行操作 // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break; // 404请求不存在
        case 404:
          Toast("网络请求不存在");
          break; // 其他错误，直接抛出错误提示
        default:
          Toast(error.response.data.message);
      }
      return Promise.reject(error.response);
    }
  }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
```

### mock 数据

1. 安装
   npm i mockjs -D

### 解决 300ms 延迟

1. 安装

`npm i fastclick -S`

2. 调用

```js
import FastClick from "fastclick";
FastClick.attach(document.body);
```

### 移动端测试工具 v-console

1. 安装
   `npm install vconsole`
2. main.js 引入

```js
import Vconsole from "vconsole";
new Vconsole();
```

### README.md 文件规范

> 项目相关备注

- 相关人员 `有多人情况下全部列出`

  - 业务分析师:
  - 前端开发人员:
  - 后台开发人员:

- 环境地址 `有更多环境依次补全, 以下详情有则补充`

  - 测试环境

    - 测试环境页面访问地址:
    - 测试环境接口地址:
    - 测试环境部署方式:

  - 生产环境
    - 生产环境页面访问地址:
    - 生产环境接口地址:
    - 生产环境部署方式:

- 补充说明:

- 迭代说明：
  - v1.0
    ......
