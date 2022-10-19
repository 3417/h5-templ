import axios from 'axios'
import {Toast} from 'vant'
const baseURL = process.env.VUE_APP_BASE_URL;

// 创建axios实例
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 50000;
// 设置post请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.interceptors.request.use(
  config => {
    // config.headers["RefererRedirectURL"] = location.href;  //TODO:业务需要
    // config.headers["RefererRedirect"] = "scfans";
    return config;
  }
);

axios.interceptors.response.use(
  response => {
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