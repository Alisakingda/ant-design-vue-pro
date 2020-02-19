export default [
  {
    path: "/",
    name: "Home",
    component: resolve => require(["@/views/Home.vue"], resolve)
  }
];
