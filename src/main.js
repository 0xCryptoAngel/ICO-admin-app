import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store";
import router from "./router/router";
import AppLayout from "@/layouts/AppLayout.vue";
import AppLayoutMain from "@/layouts/AppLayoutMain.vue";
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { createI18n } from "vue-i18n";
import "virtual:svg-icons-register";
import "./index.css";

import en from "@/locales/en.json";
import zh from "@/locales/zh.json";

const locale = localStorage.getItem("locale");
const i18n = createI18n({
    locale: locale || "zh",
    messages: {
        en,
        zh,
    },
});

createApp(App)
    .use(router)
    .use(store)
    .use(i18n)
    .component("SvgIcon", SvgIcon)
    .component("AppLayout", AppLayout)
    .component("layout-main", AppLayoutMain)
    .component("layout-default", AppLayoutDefault)
    .mount("#app");
