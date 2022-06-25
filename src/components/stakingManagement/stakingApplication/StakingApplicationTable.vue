<template>
    <div class="">
        <table class="w-full">
            <thead>
                <tr class="text-sm font-bold">
                    <th>{{ $t("No") }}</th>
                    <th>{{ $t("Staking Time") }}</th>
                    <th>{{ $t("Ending Time") }}</th>
                    <th>{{ $t("Address") }}</th>
                    <th>{{ $t("Amount") }}</th>
                    <th>{{ $t("Note") }}</th>
                    <th>{{ $t("Category") }}</th>
                    <th>{{ $t("Pause") }}</th>
                    <th>{{ $t("Action") }}</th>
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
    setup() {
        return {};
    },
};
</script>
