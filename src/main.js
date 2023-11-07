import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import axios from 'axios';
import './plugins/element.js'
import VueCookies from 'vue-cookies'
import net from "@/constants/url"

Vue.prototype.NET = net
Vue.use(VueCookies)
Vue.prototype.$axios = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')