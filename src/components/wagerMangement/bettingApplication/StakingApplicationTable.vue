<template>
    <div class="">
        <table class="w-full">
            <thead class="bg-gray-75 text-left uppercase w-full rounded-lg">
                <tr class="text-sm font-bold">
                    <th class="px-1 py-3 w-88">Staking Time</th>
                    <th class="px-1 py-3">Ending Time</th>
                    <th class="px-1 py-3">Address</th>
                    <th class="px-1 py-3">Amount</th>
                    <th class="px-1 py-3">Category</th>
                    <th class="py-3 w-5"></th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <StakingApplicationRow
                    v-bind="$attrs"
                    v-for="(link, index) in applicationsData"
                    :key="index"
                    :link="link"
                />
            </tbody>
        </table>
    </div>
</template>
<script>
import StakingApplicationRow from "./StakingApplicationRow.vue";
export default {
    components: { StakingApplicationRow },
    props: {
        applicationsData: { type: Array, required: true },
    },
};
</script>
