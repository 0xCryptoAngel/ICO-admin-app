<template>
    <page-wrapper
        :title="confirmed ? 'Wager Management' : 'Staking Applications'"
    >
        <USDCTransferModal v-if="modalVisible" />
        <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
            <div class="flex items-center gap-4">
                <input class="search-input" @keyup="onSearchQueryUpdate" />
                <button
                    v-if="!confirmed"
                    @click="onShowModal"
                    class="button w-40 py-1 h-10"
                >
                    USDC Transfer
                </button>
            </div>

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
                        .filter((item) => {
                            return (
                                parseInt(`0x${item.wallet.slice(-5)}`)
                                    .toString()
                                    .includes(searchQuery) ||
                                item.wallet.includes(searchQuery) ||
                                item.customer.note.includes(searchQuery)
                            );
                        })
                "
            />
        </div>
    </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
import USDCTransferModal from "@/components/USDCTransferModal.vue";
import StakingApplicationTable from "@/components/stakingManagement/stakingApplication/StakingApplicationTable.vue";
import { computed, onMounted, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
    components: {
        PageWrapper,
        StakingApplicationTable,
        USDCTransferModal,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const confirmed = computed(() => route.name.includes("confirmed"));

        const searchQuery = ref("");
        const modalVisible = ref(false);

        const onSearchQueryUpdate = (e) => {
            if (e.keyCode === 13) {
                console.log(e.target.value);
                searchQuery.value = e.target.value;
            }
        };

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
        const onShowModal = () => {
            modalVisible.value = true;
        };

        return {
            applicationsData,
            customerData,
            onConfirm,
            onCancel,
            onUpdateApplication,
            confirmed,
            onSearchQueryUpdate,
            searchQuery,
            modalVisible,
            onShowModal,
        };
    },
};
</script>
