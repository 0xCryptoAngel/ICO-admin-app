<template>
    <div class="">
        <table class="w-full">
            <thead class="bg-gray-75 text-left uppercase w-full rounded-lg">
                <tr class="text-sm font-bold">
                    <th>No</th>
                    <th>Time</th>
                    <th>Amount</th>
                    <th>Wallet Address</th>
                    <th>Note</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <WithdrawalManageRow
                    v-bind="$attrs"
                    v-for="(withdrawal, index) in withdrawals"
                    :key="index"
                    :withdrawal="withdrawal"
                    :note="
                        customerData.find(
                            (item) => item.wallet == withdrawal.wallet
                        )?.note
                    "
                />
            </tbody>
        </table>
    </div>
</template>
<script>
import WithdrawalManageRow from "./withdrawManageRow.vue";
export default {
    components: { WithdrawalManageRow },
    props: {
        withdrawals: { type: Array, required: true },
        customerData: { type: Array, required: true },
    },
};
</script>
