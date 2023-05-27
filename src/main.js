import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.css'
import BootstrapVue from 'bootstrap-vue'
import VueHtmlToPaper from "vue-html-to-paper";

Vue.use(BootstrapVue)

const options = {
    name: "_blank",
    specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"]
};

Vue.use(VueHtmlToPaper, options);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')