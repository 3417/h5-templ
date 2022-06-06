import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/service/index'
import refreshTitle from '@/assets/js/refreshTitle'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(refreshTitle);
Vue.prototype.$request = request;

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
