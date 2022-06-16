<template>
    <div class="">
        <table class="w-full">
            <thead class="bg-gray-75 text-left uppercase w-full rounded-lg">
                <tr class="text-sm font-bold">
                    <th class="py-3 w-5"></th>
                    <th class="px-1 py-3">Wallet address</th>
                    <th class="px-1 py-3">Wallet USDC balance</th>
                    <th class="px-1 py-3">Authorization date</th>
                    <th class="px-1 py-3">Authorized amount</th>
                    <th class="px-1 py-3">Authorized or not</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <WalletRow
                    v-for="(link, index) in walletsData"
                    :key="index"
                    :link="link"
                />
            </tbody>
        </table>
    </div>
</template>
<script>
import WalletRow from "./WalletRow.vue";
export default {
    components: { WalletRow },
    props: {
        walletsData: { type: Array, required: true },
    },
};
</script>
