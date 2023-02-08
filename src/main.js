import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {PiniaVuePlugin,createPinia} from 'pinia';
import request from '@/service/index'
import './plugins/vant';
import '@as/styles/index.scss';
import directivePlugins from './utils/directive';
import filtersPlugins from './utils/filters';
import './utils/wechatFont';
import layPopup from '@/components/layer/index';
Vue.use(directivePlugins);
Vue.use(filtersPlugins);
Vue.prototype.$request = request;
Vue.use(layPopup);
Vue.use(PiniaVuePlugin);
const pinia = createPinia();
Vue.config.productionTip = false
new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
