<template>
    <!-- Sidebar -->
    <nav class="w-60">
        <app-icon />
        <menu-section :section-data="menuItems.mainSection" />
        <select @change="onChangeLanguage" class="lang-select">
            <option value=""></option>
            <option value="en">English</option>
            <option value="zh">中文</option>
        </select>
    </nav>
</template>
<script>
import MenuSection from "./MenuSection.vue";
import appIcon from "./appIcon.vue";
import menuItems from "@/data/menu.json";
import { useRoute } from "vue-router";

export default {
    components: {
        MenuSection,
        appIcon,
    },
    setup() {
        const onChangeLanguage = (e) => {
            if (e.target.value.length)
                localStorage.setItem("locale", e.target.value);
            window.location.reload();
        };
        return {
            menuItems,
            onChangeLanguage,
        };
    },
};
</script>
