<template>
    <page-wrapper title="Staking Application">
        <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
            <staking-application-table
                @confirm="onConfirm"
                :applications-data="applicationsData"
            />
        </div>
    </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
import StakingApplicationTable from "../../components/stakingManagement/bettingApplication/StakingApplicationTable.vue";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
    components: {
        PageWrapper,
        StakingApplicationTable,
    },
    setup() {
        const store = useStore();
        onMounted(async () => {
            store.dispatch("staking/fetchStakingInformations");
        });

        const applicationsData = computed(
            () => store.getters["staking/getStakingApplications"]
        );

        const onConfirm = (application) => {
            if (window.confirm("Do you really want to comfirm?")) {
                store.dispatch("staking/confirmApplication", application);
            }
        };

        return {
            applicationsData,
            onConfirm,
        };
    },
};
</script>

<style lang="postcss">
table {
    @apply w-full text-sm text-left;
}
thead {
    @apply text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400;
}
.confirm_button {
    @apply text-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
    @apply disabled:cursor-not-allowed disabled:bg-gray-500;
}
</style>
