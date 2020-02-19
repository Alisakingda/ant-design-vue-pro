export default [
  {
    path: "/about",
    name: "About",
    meta: {
      requireAuth: true // 判断是否需要登录
    },
    component: resolve => require(["@/views/About.vue"], resolve)
  }
];
