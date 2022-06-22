<template>
    <page-wrapper :title="viewMode">
        <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
            <customer-table
                :viewMode="viewMode"
                :customers="
                    customers.filter((item) => {
                        if (viewMode == 'all') return true;
                        else if (viewMode == 'virtual')
                            return item.is_virtual === true;
                        else return item.is_virtual === false;
                    })
                "
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
import { useRoute } from "vue-router";
import Web3 from "web3/dist/web3.min.js";

export default {
    components: {
        PageWrapper,
        CustomerTable,
    },
    setup() {
        const store = useStore();

        const route = useRoute();
        const viewMode = computed(() => route.name.split("-")[0]);

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
        const onCreateVirtualUser = async () => {
            const web3 = new Web3();
            const wallet = web3.eth.accounts.create().address;

            await store.dispatch("customer/createCustomer", {
                wallet,
                is_virtual: true,
            });
            console.log(wallet);
        };
        return {
            customers,
            onUpdateCustomer,
            onCreateVirtualUser,
            viewMode,
        };
    },
};
</script>
