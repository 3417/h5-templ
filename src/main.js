import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/service/index'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@as/styles/index.scss';
import directivePlugins from './utils/directive';
Vue.use(directivePlugins);
Vue.use(Vant);
Vue.prototype.$request = request;

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
