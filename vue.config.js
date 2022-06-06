const {
  defineConfig
} = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "/",
  assetsDir: "static",
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/index.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@as', resolve('src/assets'))
      .set('@cp', resolve('src/components'))
      .set('@service', resolve('src/service'))
      .set('@static', resolve('src/static'))
      .set('@views', resolve('src/views'))
    config.module.rules.delete('eslint');
    config.plugin('html').tap(args => {
      args[0].title = '首页'
      return args
    })
  },
  devServer:{
    proxy: {
      '/api': {
        target: 'http://www.baidu.com', // 后台接口域名
        changeOrigin: true, //是否跨域
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
