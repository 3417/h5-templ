# vue-templ

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 安装依赖（yarn 出现版本问题）
```
yarn config set ignore-engines true
```


### .env文件配置
1. package.json重如果没有配置类似.env.dev这种别名的话(默认配置是:.env.development)
2. .env文件默认配置是VUE_APP_xxxx开头
### 关于vw换算问题
1. 设计稿为375  换算为  1vw = 3.75px;
2. 设计稿为750 换算为 1vw = 7.5px;

```
动态计算
let scale = window.screen.width / 750  //计算缩放比
((设置的像素单位 * scale) * 2).toFixed(2) + 'px';
```

### 关于多页面配置使用

1. 多页面统一于src/pages文件夹下
2. 多页面采用动态加载，html模板文件置于public文件目录下，如果有修改则需要自定义修改vue.config.js文件
3. 多页面的文件 建议采用同名同文件名的方式
4. 多页面的文件内容建议复制main.js中的内容可自主更替，注意引入的路径
5. 多页面的跳转方式为:window.location.href = '/test.html';
