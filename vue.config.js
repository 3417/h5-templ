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
const pxToViewportConfig = {
  unitToConvert: 'px', // 要转化的单位
  unitPrecision: 3, // 转换后的精度，即小数点位数
  propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
  viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
  fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
  selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
  minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
  mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
  replace: true, // 是否转换后直接更换属性值
  landscape: false // 是否处理横屏情况
}
// 动态配置多页面
// const glob = require("glob");
// const getPages = ()=>{
//   let entries = glob.globSync("./src/pages/*/*.js");
//   console.log(entries)
//   let pages = {
//     index:{
//       entry:"src/main.js",
//       template:"public/index.html",
//       fileName:"index.html",
//       chunks:['chunk-vendors', 'chunk-common', 'index']
//     }
//   };
//   entries.forEach(filePath=>{
//     let fileName = filePath.substring(filePath.lastIndexOf("\\")+1,filePath.lastIndexOf("."));
//     console.log(fileName);
//     pages[fileName] = {
//       entry:`src/pages/${fileName}/${fileName}.js`,
//       template:`public/${fileName}.html`,
//       fileName:`${fileName}.html`, //dist输出
//       chunks:["chunk-vendors","chunk-common",fileName]
//     }
//     console.log("pages",pages);
//   })
//   return pages;
// }
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: `${fileName}`,
  lintOnSave: false,
  publicPath: "./",
  assetsDir: "static",
  productionSourceMap: false,
  // pages:getPages(), //动态配置多页面
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/var.scss";`
      },
      postcss:{
        postcssOptions:{
          plugins:[
            require("postcss-px-to-viewport")({
              viewportWidth:375,
              exclude: /(node_modules)/,
              ...pxToViewportConfig
            })
          ]
        }
      }
    }
  },
  configureWebpack: (config) => {
    config.optimization = {
      nodeEnv: false,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        })
      ]
    }
    // config.plugins = [require('unplugin-auto-import/webpack')];
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
    // todo:如果是多页面则需要将这块注释掉
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
