const {
  defineConfig
} = require('@vue/cli-service')
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir)
}
const timestamp = new Date().getTime();
const fileName = 'dist';
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: `${fileName}`,
  lintOnSave: false,
  publicPath: "./",
  assetsDir: "static",
  productionSourceMap: false,
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/var.scss";`
      }
    }
  },
  configureWebpack: (config) => {
    config.optimization = {
      nodeEnv: false,
      minimizer: [
        new TerserPlugin({
          extractComments: false
        })
      ]
    }
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = `js/[name].${timestamp}.js`
      config.output.chunkFilename = `js/[name].${timestamp}.js`
      config.plugins.push(
        new FileManagerPlugin({ //初始化 filemanager-webpack-plugin 插件实例
          events: {
            onEnd: {
              delete: [ //首先需要删除项目根目录下的dist.zip
                `./${fileName}.zip`,
              ],
              archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
                {
                  source: `./${fileName}`,
                  destination: `./${fileName}.zip`,
                  format: 'zip'
                },
              ]
            }
          }
        }))
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
  devServer: {
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
