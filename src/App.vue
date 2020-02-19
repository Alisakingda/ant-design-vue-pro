<template>
  <!-- <a-locale-provider :locale="locale"> -->
  <div id="app">
    <!-- <a-button type="primary">Primary</a-button>
      <a-button>Default</a-button>
      <a-button type="dashed">Dashed</a-button>
      <a-button type="danger">微信</a-button>
      <a-icon type="step-backward" />
      <a-date-picker @change="onChange" />
      <a-range-picker :locale="locale" @change="onChange" /> -->
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
    <router-view />
  </div>
  <!-- </a-locale-provider> -->
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
// import { GetExample } from "@/api/login/index.js";

export default {
  data() {
    return {
      locale: zhCN
    };
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    }
  },
  created() {
    // console.log(111);
    // console.log(GetExample());
    // GetExample();
  }
};
</script>

<style lang="less"></style>
