<template>
    <page-wrapper title="Withdrawal Management">
        <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
            <Withdraw-Manage-Table
                :withdrawals="withdrawals"
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
        onMounted(async () => {
            store.dispatch("withdrawal/fetchWithdrawalList");
            store.dispatch("customer/fetchCustomers");
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
        };
    },
};
</script>
