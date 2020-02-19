import Vue from "vue";
import Vuex from "vuex";
import chatModule from "./modules/chat/index";
import productsModule from "./modules/products/index";
import loginModule from "./modules/login/index";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  // modules: {}
  modules: {
    a: chatModule,
    b: productsModule,
    login: loginModule
  }
  // namespaced: true
});
