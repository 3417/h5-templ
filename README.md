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
