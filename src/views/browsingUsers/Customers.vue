<template>
    <page-wrapper title="User Management">
        <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
            <customer-table
                :customers="customers"
                @updateCustomer="onUpdateCustomer"
            />
        </div>
    </page-wrapper>
</template>

<script>
import CustomerTable from "@/components/customers/CustomerTable.vue";
import PageWrapper from "@/components/PageWrapper.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
    components: {
        PageWrapper,
        CustomerTable,
    },
    setup() {
        const store = useStore();
        onMounted(async () => {
            await store.dispatch("customer/fetchCustomers");
        });

        const customers = computed(
            () => store.getters["customer/getCustomers"]
        );
        const onUpdateCustomer = async (msg, wallet, customer) => {
            // if (window.confirm(msg)) {
            await store.dispatch("customer/updateCustomer", {
                wallet,
                customer,
            });
            // }
        };
        return {
            customers,
            onUpdateCustomer,
        };
    },
};
</script>
