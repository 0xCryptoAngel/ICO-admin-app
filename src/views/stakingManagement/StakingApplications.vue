<template>
    <page-wrapper title="Staking Applications">
        <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
            <staking-application-table
                @confirm="onConfirm"
                @cancel="onCancel"
                :applications-data="applicationsData"
            />
        </div>
    </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
import StakingApplicationTable from "../../components/stakingManagement/stakingApplication/StakingApplicationTable.vue";
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

        const onCancel = (application) => {
            if (window.confirm("Do you really want to cancel?")) {
                store.dispatch("staking/cancelApplication", application);
            }
        };
        return {
            applicationsData,
            onConfirm,
            onCancel,
        };
    },
};
</script>
