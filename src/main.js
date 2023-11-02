import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import axios from 'axios';
import VueNativeSock from 'vue-native-websocket';
Vue.prototype.$axios = axios;

Vue.use(ElementUI);

Vue.use(VueNativeSock, 'ws://127.0.0.1:8087/websocket', {
  format: 'json',
  reconnection: true, // 自动重连
  reconnectionAttempts: 5, // 重连尝试次数
  reconnectionDelay: 3000, // 重连延迟（毫秒）
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
