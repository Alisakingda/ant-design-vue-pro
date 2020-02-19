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
