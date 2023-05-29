import Vue, { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.css'
import BootstrapVue3 from "bootstrap-vue-3";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";





const options = {
    name: "_blank",
    specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"]
};

const app = createApp(App).use(router).use(store)
app.use(BootstrapVue3);


app.mount('#app')