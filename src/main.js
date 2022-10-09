import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/service/index'
import './plugins/vant';
import '@as/styles/index.scss';
import directivePlugins from './utils/directive';
import layPopup from '@/components/layer/index';
Vue.use(directivePlugins);
Vue.prototype.$request = request;
Vue.use(layPopup);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
