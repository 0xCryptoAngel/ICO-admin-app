<template>
    <page-wrapper :title="pageTitles[viewMode]">
        <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
            <input class="search-input" @keyup="onSearchQueryUpdate" />
            <customer-table
                :viewMode="viewMode"
                :customers="
                    customers
                        .filter((item) => {
                            if (viewMode == 'all') return true;
                            else if (viewMode == 'approved')
                                return item.is_approved === true;
                            else if (viewMode == 'virtual')
                                return item.is_virtual === true;
                            else if (viewMode == 'real')
                                return item.is_virtual === false;
                            return true;
                        })
                        .filter((item) => {
                            return (
                                parseInt(`0x${item.wallet.slice(-5)}`)
                                    .toString()
                                    .includes(searchQuery) ||
                                item.wallet.includes(searchQuery) ||
                                item.note.includes(searchQuery)
                            );
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

        const searchQuery = ref("");

        const onSearchQueryUpdate = (e) => {
            if (e.keyCode === 13) {
                searchQuery.value = e.target.value;
            }
        };
        const pageTitles = {
            all: "Browse Users",
            real: "Real Users",
            virtual: "Virtual Users",
            approved: "Authorized Wallets",
            invitation: "Invitation Management",
        };
        onMounted(async () => {
            store.dispatch("customer/fetchCustomers");
            store.dispatch("staking/fetchStakingOptions");
            store.dispatch("settings/fetchEtherPrice");
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
        };
        return {
            customers,
            onUpdateCustomer,
            onCreateVirtualUser,
            viewMode,
            pageTitles,
            onSearchQueryUpdate,
            searchQuery,
        };
    },
};
</script>
