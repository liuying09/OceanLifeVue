import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";

import jquery from "jquery";

import ElementPlus from "element-plus";

import "element-plus/dist/index.css";

window.$ = window.jQuery = jquery;

// createApp(App).use(ElementPlus).mount('#app')
// createApp(App).use(axios);
createApp(App).use(store).use(router).use(axios).use(ElementPlus).mount("#app");
