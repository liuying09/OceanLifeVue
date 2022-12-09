import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";

import jquery from "jquery";

window.$ = window.jQuery = jquery;

createApp(App).use(axios);
createApp(App).use(store).use(router).mount("#app");
