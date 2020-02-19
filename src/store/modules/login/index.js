import { LoginBtn } from "@/api/login";

export default {
  namespaced: true,
  state: {
    login: "leon",
    token: ""
  },
  getters: {
    get_login(state) {
      return state.login;
    },
    get_token(state) {
      return state.token;
    }
  },
  mutations: {
    set_login(state, payload) {
      // payload 实际为返回数据
      state.login = payload;
    },
    set_token(state, payload) {
      state.token = payload;
    }
  },
  // 在actions中做异步请求，通过async、await可是异步请求同步执行
  actions: {
    async set_login({ commit }, payload) {
      let loginData = await LoginBtn(payload);
      commit("set_login", loginData);
    },
    set_token({ commit }, payload) {
      commit("set_token", payload);
    }
  }
};
