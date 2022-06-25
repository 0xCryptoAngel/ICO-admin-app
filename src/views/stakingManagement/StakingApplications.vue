<template>
    <page-wrapper
        :title="confirmed ? 'Wager Management' : 'Staking Applications'"
    >
        <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
            <staking-application-table
                @confirm="onConfirm"
                @cancel="onCancel"
                @updateApplication="onUpdateApplication"
                :applications-data="
                    applicationsData
                        ?.filter(
                            (item) => !confirmed || item.is_confirmed == true
                        )
                        .map((item) => {
                            item.customer = customerData.find(
                                (cus) => cus.wallet === item.wallet
                            );
                            return item;
                        })
                "
            />
        </div>
    </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
import StakingApplicationTable from "../../components/stakingManagement/stakingApplication/StakingApplicationTable.vue";
import { computed, onMounted, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
    components: {
        PageWrapper,
        StakingApplicationTable,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const confirmed = computed(() => route.name.includes("confirmed"));

        onMounted(async () => {
            store.dispatch("staking/fetchStakingInformations");
            store.dispatch("customer/fetchCustomers");
        });

        const applicationsData = computed(
            () => store.getters["staking/getStakingApplications"]
        );
        const customerData = computed(
            () => store.getters["customer/getCustomers"]
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
        const onUpdateApplication = (application) => {
            store.dispatch("staking/updateApplication", application);
        };
        return {
            applicationsData,
            customerData,
            onConfirm,
            onCancel,
            onUpdateApplication,
            confirmed,
        };
    },
};
</script>
