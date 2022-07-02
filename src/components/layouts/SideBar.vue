<template>
    <!-- Sidebar -->
    <nav class="w-60 flex flex-col">
        <app-icon />
        <menu-section :section-data="menuItems.mainSection" />
        <select
            id="locale_select"
            @change="onChangeLanguage"
            class="lang-select mt-auto mb-8"
        >
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
import { onMounted } from "@vue/runtime-core";

export default {
    components: {
        MenuSection,
        appIcon,
    },
    setup() {
        onMounted(() => {
            if (document.getElementById("locale_select"))
                document.getElementById("locale_select").value =
                    localStorage.getItem("locale");
        });
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
