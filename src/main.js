import Vue from "vue";
// pc
// import "@/ant/index.js"; // ant-design-vue 按需加载配置;
// 移动
import "@/vant/index.js"; // vant 按需加载配置;
import router from "./router/index.js"; // router配置相关,路由模块拆分;全局路由守卫,拦截登录;
import store from "./store"; //store配置相关,模块拆分;
import FastClick from "fastclick"; // 解决300ms延迟
// import Vconsole from "vconsole"; // 移动端测试工具

FastClick.attach(document.body);

// new Vconsole();

Vue.config.productionTip = false;

const App = () => import("./App.vue"); // 组件懒加载;

// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  // require("@/mock"); // 引入mock数据
  console.log("mock");
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
