import axios from 'axios'
import {Toast} from 'vant'
const baseURL = process.env.VUE_APP_BASE_URL;
// 创建axios实例
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 5 * 10 * 1000;

// 创建请求loading弹层
let loadingSum = 0;
let loading;

// 双token验证机制
let isRefreshing = false;
let requests = [];
const showLoading = (message)=>{
  loading = Toast.loading({
      message: message || '加载中...',
      duration: 0,
      forbidClick:true
  })
}

const hideLoading = ()=>{
  loading.clear()
}
// 刷新token
const refreshToken = ()=>{
  const _refreshToken = sessionStorage.getItem('refreshToken');
  return new Promise((resolve,reject)=>{
      axios({
          method:'post',
          url:'/oauth/refreshToken',
          baseURL,
          data:{
            refreshToken:_refreshToken
          }
      }).then(res=>{
          resolve(res);
      },err=>{
          reject(err);
      })
  })
}
// 封装双token机制
const backRequest = (_res)=>{
  // TODO:如存在登录操作则执行相关清除操作重定向到登录界面
  function backLogin(){
      console.log("清除session缓存重新登录")
      // sessionStorage.clear();
  }
  
  if(!isRefreshing){
      isRefreshing = true;
      return refreshToken().then(_r=>{
          console.log("获取的数据消息=>",_r);
          const {code} = _r;
          const numCode = (rCode)=>{
            return rCode === code ? true : false;
          }
          if(numCode(0)){
            const {accessToken,refreshToken} = _r.value;
              sessionStorage.setItem('accessToken',accessToken);
              sessionStorage.setItem('refreshToken',refreshToken);
              _res.config.headers.AuthorizedAccess = `${accessToken}`;
              requests.forEach((cb) => cb(accessToken))
              requests = [] // 重新请求完清空
              return axios.request(_res.config);

          }else if(numCode(723)){
              backLogin();
          }else if(numCode(720)){
              sessionStorage.removeItem('accessToken');
              sessionStorage.removeItem('refreshToken');
              _res.config.headers.AuthorizedAccess = '';
              console.log("refreshToken过期后执行的逻辑",_res.config)
              requests.forEach((cb) => cb(''))
              requests = [] // 重新请求完清空
              return axios.request(_res.config);
          }
      }).catch(err=>{
        console.log("获取错误信息数据体=>",err);
      }).finally(()=>{
          isRefreshing = false;
      })
  }else{
    return new Promise((resolve)=>{
      requests.push(token=>{
        _res.config.headers.AuthorizedAccess = `${token}`;
        resolve(axios.request(_res.config));
      })
    })
  }
}
// 设置post请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
axios.interceptors.request.use(
  config => {
    let accessToken = sessionStorage.getItem('accessToken');
    if(accessToken){
      config.headers.AuthorizedAccess = `${accessToken}`;
    }
    // config.headers["RefererRedirectURL"] = location.href;  //TODO:业务需要
    // config.headers["RefererRedirect"] = "scfans";
    const {method,params,data} = config;
    let mts = {'get':params,'post':data};
    let loadingQuerys = {loading:mts[method]['loading'],loadMsg:mts[method]['loadMsg']};
    delete mts[method]['loading']
    delete mts[method]['loadMsg']
    loadingSum++;
    if(loadingSum == 1 && loadingQuerys.loading){
        showLoading(loadingQuerys.loadingMsg);
    }
    return config;
  }
);

axios.interceptors.response.use(
  response => {
    loadingSum--;
    if(loadingSum == 0){
      hideLoading();
    }
    // 与后台约定code码
    const code = response.data.code;
    switch(code){
      case 0:
        return response.data;
      case 302:
        location.href= response.data.msg;
        break;
      default:
        if(code === 720 && (response.config.url).indexOf('/oauth/refreshToken') == -1){
          return backRequest(response);
        }else{
          Toast(response.data.msg);
          return Promise.reject(response.data);
        }
    }
  },
  error => {
    loadingSum--;
    if(loadingSum == 0){
      hideLoading();
    }
    Toast(error.toString());
    return Promise.reject(error);
  }
  );

export default {
  get(url, params, baseURL) {
    return axios({
      method: 'get',
      url: url,
      baseURL,
      params: params
    });
  },
  post(url, params, baseURL) {
    return axios({
      method: 'post',
      url: url,
      baseURL,
      data: params
    });
  }
}