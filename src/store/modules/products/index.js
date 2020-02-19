export default {
  namespaced: true,
  state: {
    product: "商品"
  },
  getters: {
    get_product(state) {
      return state.product;
    }
  },
  mutations: {
    set_product(state, payload) {
      state.product = payload;
    }
  },
  actions: {
    set_product({ commit }, payload) {
      commit("set_product", payload);
    }
  }
};
// const moduleB = {
//   // namespaced: true,
//   state: {
//     name: "dog",
//     age: 4
//   },
//   mutations: {
//     addAge: state => {
//       state.age++;
//     }
//   },
//   getters: {
//     dogManAge: state => {
//       return state.age + 10;
//     }
//   },
//   actions: {
//     addAge: context => {
//       setTimeout(() => {
//         context.commit("addAge");
//       }, 3000);
//     }
//   }
// };
// export default moduleB;
