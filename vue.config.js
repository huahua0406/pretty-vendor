// vue.config.js
module.exports = {
  publicPath: '/',
  devServer: {
    open: true, // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://118.31.77.247',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

// https://juejin.im/post/5c3c544c6fb9a049d37f5903
// https://juejin.im/post/5c4a6fcd518825469414e062
// https://juejin.im/post/5bd02f98e51d457a944b634f
// https://juejin.im/post/5c4a83e36fb9a049b13e91ba
// vue 实现的小而美的商城
// https://blog.csdn.net/qq_38388578/article/details/83090083
// https://segmentfault.com/a/1190000015690250
// https://juejin.im/post/5cd1b28e6fb9a03235587493#heading-4
