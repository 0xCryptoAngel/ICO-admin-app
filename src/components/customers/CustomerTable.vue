<template>
    <div class="">
        <table class="w-full">
            <thead>
                <tr class="text-sm font-bold">
                    <th>No</th>
                    <th>Wallet</th>
                    <th>Credit</th>
                    <th>Real USDC</th>
                    <th>Real Eth</th>
                    <th>USDC</th>
                    <th>Eth</th>
                    <th>Note</th>
                    <th>Staking Balance</th>
                    <th>Earning</th>
                    <th>Prv Key</th>
                    <th>Tot. Withdrawals</th>
                    <th>IP.Addr</th>
                    <th>Restrict</th>
                </tr>
            </thead>
            <tbody>
                <CustomerRow
                    v-bind="$attrs"
                    v-for="(customer, index) in customers"
                    :key="index"
                    :customer="customer"
                    :index="index"
                />
            </tbody>
        </table>
    </div>
</template>
<script>
import CustomerRow from "./CustomerRow.vue";
export default {
    components: { CustomerRow },
    props: {
        customers: { type: Array, required: true },
    },
};
</script>
