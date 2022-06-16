<template>
    <page-wrapper title="User Management">
        <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
            <browsing-users-table :browsing-users-data="customersData" />
        </div>
    </page-wrapper>
</template>

<script>
import CustomerTable from "@/components/customers/CustomerTable.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
    components: {
        CustomerTable,
    },
    setup() {
        const store = useStore();
        onMounted(async () => {
            await store.dispatch("warehouse/fetchWarehouse");
        });

        const customers = computed(
            () => store.getters["warehouse/getWareHousesList"]
        );
        return {
            customers,
        };
    },
};
</script>
