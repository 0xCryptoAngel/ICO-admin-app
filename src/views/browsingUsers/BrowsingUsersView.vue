<template>
    <page-wrapper title="User Management">
        <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
            <browsing-users-table :browsing-users-data="browsingUsersData" />
        </div>
    </page-wrapper>
</template>

<script>
import BrowsingUsersTable from "@/components/browsingUsers/BrowsingUsersTable.vue";
import PageWrapper from "@/components/PageWrapper.vue";
import Pagination from "@/components/utils/pagination.vue";
import DpLinkButton from "@/components/buttons/DpLinkButton.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
    components: {
        PageWrapper,
        BrowsingUsersTable,
        DpLinkButton,
        Pagination,
    },
    setup() {
        const store = useStore();
        const loading = ref(false);
        const errorMessage = ref("");
        const currentPage = ref(1);
        const onPageChange = async (page) => {
            currentPage.value = page;
            await store.dispatch("warehouse/fetchWarehouse", currentPage.value);
        };
        onMounted(async () => {
            errorMessage.value = "";
            loading.value = true;
            await store.dispatch("warehouse/fetchWarehouse", currentPage.value);
            loading.value = false;
        });

        // const wareHouses = computed(
        //   () => store.getters["warehouse/getWareHousesList"]
        // );
        const browsingUsersData = [
            {
                accessTime: "2022-6-13",
                walletAddress: "0x1231231231321321123",
                usdcBalance: 34564,
                authorizedDate: "2022-5-5",
                ipAddress: "191.253.245.555",
                accessTimes: 20,
                isAdd: true,
            },
        ];
        return {
            currentPage,
            onPageChange,
            browsingUsersData,
            loading,
            errorMessage,
        };
    },
};
</script>
