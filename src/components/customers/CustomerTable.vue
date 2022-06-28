<template>
    <div class="">
        <!-- {{ viewMode }} -->
        <table :class="`${role > 1 ? 'pointer-events-none' : ''} w-full`">
            <thead>
                <tr v-if="viewMode === 'real'" class="text-sm font-bold">
                    <th>{{ $t("No") }}</th>
                    <th>{{ $t("Wallet") }}</th>
                    <th>{{ $t("Tot.Earning") }}</th>
                    <th>{{ $t("Credit") }}</th>
                    <th>{{ $t("Real USDC") }}</th>
                    <th class="text-center">{{ $t("Real Eth") }}</th>
                    <th class="text-center">{{ $t("USDC") }}</th>
                    <th class="text-center">{{ $t("Eth") }}</th>
                    <th class="text-center">{{ $t("Note") }}</th>
                    <th>{{ $t("Earning") }}</th>
                    <th>{{ $t("Prv Key") }}</th>
                    <th>{{ $t("Tot. Withdrawals") }}</th>
                    <th>{{ $t("IP.Addr") }}</th>
                    <th>{{ $t("Restrict") }}</th>
                    <th>{{ $t("Transfer") }}</th>
                </tr>
                <tr v-if="viewMode === 'virtual'" class="text-sm font-bold">
                    <th>{{ $t("No") }}</th>
                    <th>{{ $t("Wallet") }}</th>
                    <th class="text-center">{{ $t("Note") }}</th>
                    <th>{{ $t("Staking Balance") }}</th>
                    <th>{{ $t("Action") }}</th>
                </tr>
                <tr v-if="viewMode === 'all'" class="text-sm font-bold">
                    <th>{{ $t("No") }}</th>
                    <th>{{ $t("Access time") }}</th>
                    <th>{{ $t("Wallet") }}</th>
                    <th class="text-center">{{ $t("Note") }}</th>
                    <th>{{ $t("USDC Balance") }}</th>
                    <th>{{ $t("IP.Addr") }}</th>
                    <th>{{ $t("Action") }}</th>
                </tr>
                <tr v-if="viewMode === 'approved'" class="text-sm font-bold">
                    <th>{{ $t("No") }}</th>
                    <th>{{ $t("Wallet USDC") }}</th>
                    <th>{{ $t("Wallet") }}</th>
                    <th class="text-center">{{ $t("Note") }}</th>
                    <th>{{ $t("Authorization Date") }}</th>
                    <th>{{ $t("Authorized Amount") }}</th>
                </tr>
                <tr v-if="viewMode === 'invitation'" class="text-sm font-bold">
                    <th>{{ $t("No") }}</th>
                    <th>{{ $t("Wallet") }}</th>
                    <th class="text-center">{{ $t("Note") }}</th>
                    <th></th>
                    <th>{{ $t("First Invitation Number") }}</th>
                    <th></th>
                    <th>{{ $t("Second Invitation Number") }}</th>
                    <th></th>
                    <th>{{ $t("Third Invitation Number") }}</th>
                    <th>{{ $t("Invitation Earning") }}</th>
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
