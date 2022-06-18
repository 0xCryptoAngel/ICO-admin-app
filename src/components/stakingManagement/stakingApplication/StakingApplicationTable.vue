<template>
    <div class="">
        <table class="w-full">
            <thead>
                <tr class="text-sm font-bold">
                    <th>Staking Time</th>
                    <th>Ending Time</th>
                    <th>Address</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <StakingApplicationRow
                    v-bind="$attrs"
                    v-for="(application, index) in applicationsData"
                    :key="index"
                    :application="application"
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
