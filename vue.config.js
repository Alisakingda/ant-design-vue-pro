module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    host: "192.168.0.21",
    port: 8080,
    https: false,
    hotOnly: false
  }
};
