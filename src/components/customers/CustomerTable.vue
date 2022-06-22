<template>
    <div class="">
        <!-- {{ viewMode }} -->
        <table class="w-full">
            <thead>
                <tr
                    v-if="viewMode === 'real' || viewMode === 'virtual'"
                    class="text-sm font-bold"
                >
                    <th>No</th>
                    <th>Wallet</th>
                    <th>Credit</th>
                    <th>Real USDC</th>
                    <th class="text-center">Real Eth</th>
                    <th class="text-center">USDC</th>
                    <th class="text-center">Eth</th>
                    <th class="text-center">Note</th>
                    <!-- <th>Staking Balance</th> -->
                    <th>Earning</th>
                    <th>Prv Key</th>
                    <th>Tot. Withdrawals</th>
                    <th>IP.Addr</th>
                    <th>Restrict</th>
                </tr>
                <tr v-if="viewMode === 'all'" class="text-sm font-bold">
                    <th>No</th>
                    <th>Access time</th>
                    <th>Wallet</th>
                    <th>USDC Balance</th>
                    <th>IP.Addr</th>
                    <th>Action</th>
                </tr>
                <tr v-if="viewMode === 'approved'" class="text-sm font-bold">
                    <th>No</th>
                    <th>Wallet USDC</th>
                    <th>Wallet</th>
                    <th>Authorization Date</th>
                    <th>Authorized Amount</th>
                </tr>
            </thead>
            <tbody>
                <CustomerRow
                    v-bind="$attrs"
                    v-for="(customer, index) in customers"
                    :key="index"
                    :customer="customer"
                    :index="index"
                    :viewMode="viewMode"
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
        viewMode: { type: String, required: true },
    },
};
</script>
