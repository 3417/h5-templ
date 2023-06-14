import axios from 'axios'
import {Toast} from 'vant'
const baseURL = process.env.VUE_APP_BASE_URL;
// 创建axios实例
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 5 * 10 * 1000;

// 创建请求loading弹层
let loadingSum = 0;
let loading;
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
// 设置post请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.interceptors.request.use(
  config => {
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
        Toast(response.data.msg);
        return Promise.reject(response.data);
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