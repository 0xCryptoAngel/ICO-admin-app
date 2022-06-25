<template>
    <div class="">
        <!-- {{ viewMode }} -->
        <table :class="`${role > 1 ? 'pointer-events-none' : ''} w-full`">
            <thead>
                <tr v-if="viewMode === 'real'" class="text-sm font-bold">
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
                <tr v-if="viewMode === 'virtual'" class="text-sm font-bold">
                    <th>No</th>
                    <th>Wallet</th>
                    <th class="text-center">Note</th>
                    <th>Staking Balance</th>
                    <th>Action</th>
                </tr>
                <tr v-if="viewMode === 'all'" class="text-sm font-bold">
                    <th>No</th>
                    <th>Access time</th>
                    <th>Wallet</th>
                    <th class="text-center">Note</th>
                    <th>USDC Balance</th>
                    <th>IP.Addr</th>
                    <th>Action</th>
                </tr>
                <tr v-if="viewMode === 'approved'" class="text-sm font-bold">
                    <th>No</th>
                    <th>Wallet USDC</th>
                    <th>Wallet</th>
                    <th class="text-center">Note</th>
                    <th>Authorization Date</th>
                    <th>Authorized Amount</th>
                </tr>
                <tr v-if="viewMode === 'invitation'" class="text-sm font-bold">
                    <th>No</th>
                    <th>Wallet</th>
                    <th class="text-center">Note</th>
                    <th></th>
                    <th>First Invitation Number</th>
                    <th></th>
                    <th>Second Invitation Number</th>
                    <th></th>
                    <th>Third Invitation Number</th>
                    <th>Invitation Earning</th>
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
    setup() {
        return {
            role: parseInt(localStorage.getItem("role")),
        };
    },
};
</script>
