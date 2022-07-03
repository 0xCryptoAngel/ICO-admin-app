<template>
    <page-wrapper title="Withdrawal Management">
        <div class="flex flex-col w-full rounded-3xl px-4 py-4">
            <input class="search-input" @keyup="onSearchQueryUpdate" />
            <Withdraw-Manage-Table
                :withdrawals="
                    withdrawals.filter((item) => {
                        const res = customerData.find(
                            (customer) => customer.wallet == item.wallet
                        );
                        return (
                            res?.note?.includes(searchQuery) ||
                            parseInt(`0x${item.wallet.slice(-5)}`)
                                .toString()
                                .includes(searchQuery) ||
                            item.wallet.includes(searchQuery)
                        );
                    })
                "
                :customerData="customerData"
                @confirm="onConfirm"
            />
        </div>
    </page-wrapper>
</template>

<script>
import WithdrawManageTable from "@/components/withdrawalManage/withdrawManageTable.vue";
import PageWrapper from "@/components/PageWrapper.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
    components: {
        PageWrapper,
        WithdrawManageTable,
    },
    setup() {
        const store = useStore();

        const searchQuery = ref("");

        const intervalId = ref(-1);
        const pullUpdates = async () => {
            store.dispatch("withdrawal/fetchWithdrawalList");
            store.dispatch("customer/fetchCustomers");
        };

        const onSearchQueryUpdate = (e) => {
            if (e.keyCode === 13) {
                searchQuery.value = e.target.value;
            }
        };

        onMounted(async () => {
            store.dispatch("withdrawal/fetchWithdrawalList");
            store.dispatch("customer/fetchCustomers");
            intervalId.value = setInterval(pullUpdates, 15000);
        });

        const withdrawals = computed(
            () => store.getters["withdrawal/getWithdrawalList"]
        );

        const customerData = computed(
            () => store.getters["customer/getCustomers"]
        );

        const onConfirm = ({ withdrawal, is_confirmed }) => {
            if (
                window.confirm(
                    `Do you really want to ${
                        is_confirmed ? "pass" : "not pass"
                    }?`
                )
            ) {
                store.dispatch("withdrawal/confirmWithdrawal", {
                    withdrawal,
                    is_confirmed,
                });
            }
        };
        return {
            withdrawals,
            customerData,
            onConfirm,
            searchQuery,
            onSearchQueryUpdate,
        };
    },
};
</script>
