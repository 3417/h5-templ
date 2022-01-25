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
    config.headers["RefererRedirectURL"] = location.href;  //TODO:业务需要
    config.headers["RefererRedirect"] = "scfans";
    return config;
  }
);

axios.interceptors.response.use(
  response => {
    const code = response.data.code || response.data.code === 0 ? response.data.code : response.data.errCode;
    if (0 !== code && 302 != code) {
      Toast(response.data.msg);
      return Promise.reject(response.data);
    } else if(302 == code){
        location.href = response.data.msg;
    }else{
      return response.data;
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