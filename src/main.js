import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from "./util/api";
import path from "./util/path";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$path = path;
Vue.use(ElementUI)
Vue.prototype.$bus = new Vue();
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
