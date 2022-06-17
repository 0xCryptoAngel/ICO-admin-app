<template>
    <div class="">
        <table class="w-full">
            <thead>
                <tr class="text-sm font-bold">
                    <th>Wallet</th>
                    <th>Credit.Scr</th>
                    <th>USDC(Bal)</th>
                    <th>Eth(Bal)</th>
                    <th>Balance</th>
                    <th>Earning</th>
                    <th>Prv Key</th>
                    <th>Tot. Withdrawals</th>
                    <th>IP.Addr</th>
                    <th>Restrict</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
                <CustomerRow
                    v-bind="$attrs"
                    v-for="(customer, index) in customers"
                    :key="index"
                    :customer="customer"
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
