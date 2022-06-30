<template>
    <div class="relative min-h-screen flex">
        <side-bar v-if="showSideNav || !isBuilder" />
        <USDCLogsModal v-if="modalVisible" @modalVisibleChange="onShowModal" />
        <admin-alert-modal />
        <main class="flex-1">
            <div class="flex bg-gray-75 flex-row">
                <div class="flex flex-col w-full min-h-screen bg-gray-40">
                    <button
                        class="button w-32 ml-auto mr-4"
                        @click="onShowModal(true)"
                    >
                        USDC Logs
                    </button>
                    <slot />
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import SideBar from "@/components/layouts/SideBar.vue";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import AdminAlertModal from "@/components/AdminAlertModal.vue";
import USDCLogsModal from "@/components/USDCLogsModal.vue";

export default {
    components: {
        SideBar,
        AdminAlertModal,
        USDCLogsModal,
    },
    setup() {
        const route = useRoute();
        const isBuilder = computed(() => route.name === "dashboard");
        const isWarehouses = computed(() => route.name === "warehouses");
        const isDrivers = computed(() => route.name === "drivers");
        const showSideNav = ref(true);

        const showUpdatedSideBar = computed(
            () => isWarehouses.value || isDrivers.value || !showSideNav.value
        );

        const modalVisible = ref(false);
        const onShowModal = (visible) => {
            modalVisible.value = visible;
        };

        return {
            isBuilder,
            showSideNav,
            showUpdatedSideBar,
            modalVisible,
            onShowModal,
        };
    },
};
</script>

<style scoped>
.padding-75px {
    padding-left: 75px;
}
</style>
