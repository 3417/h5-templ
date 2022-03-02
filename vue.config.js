
//自定义配置
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new FileManagerPlugin({ //初始化 filemanager-webpack-plugin 插件实例
      events:{
        onEnd: {
          delete: [ //首先需要删除项目根目录下的dist.zip
            './h5_templ.zip',
          ],
          archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
            {
              source: './h5_templ',
              destination: './h5_templ.zip',
              format: 'zip'
            },
          ]
        }
      }
    }))
}
module.exports = {
  lintOnSave: false,
  publicPath: './',
  outputDir: 'h5_templ',
  assetsDir: 'static',
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/index.scss";`
      }
    }
  },
  //webpack的相关配置在这里
  configureWebpack: { //webpack的相关配置在这里
    plugins,
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
    config.plugin('html').tap(args=>{
      args[0].title = '首页'
      return args
    })
  },
  devServer: {
    open: true,
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
}
