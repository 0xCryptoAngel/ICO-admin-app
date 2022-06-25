<template>
    <div class="bg-gray-40">
        <page-wrapper :title="$t('System Settings')">
            <div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-white rounded-md p-4 flex items-center">
                        <img
                            src="../../assets/svgIcons/user_icon.svg"
                            class="w-8 mr-2"
                        />
                        <div class="w-full">
                            <input
                                :value="settingsData?.contract_address"
                                class="trans_input w-3/4"
                                id="contract_address"
                            />
                            <p class="text-slate-900 text-2xl">
                                {{ $t("Contract Address") }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-white rounded-md p-4 flex items-center">
                        <img
                            src="../../assets/svgIcons/user_icon.svg"
                            class="w-8 mr-2"
                        />
                        <div class="w-full">
                            <input
                                :value="settingsData?.usdc_vault"
                                class="trans_input w-3/4"
                                id="usdc_vault"
                            />
                            <p class="text-slate-900 text-2xl">
                                {{ $t("USDC Vault") }}
                            </p>
                        </div>
                    </div>
                </div>

                <button @click="onUpdate" class="button info_button">
                    {{ $t("Update Settings") }}
                </button>
            </div>
        </page-wrapper>
        <page-wrapper title="Invitation Settings">
            <div>
                <div
                    class="grid grid-cols-3 gap-4"
                    v-if="!!settingsData.invitation_bonus_percentages"
                >
                    <div class="bg-white rounded-md p-4 flex items-center">
                        <img
                            src="../../assets/svgIcons/user_icon.svg"
                            class="w-8 mr-2"
                        />
                        <div class="w-full">
                            <input
                                :value="
                                    settingsData
                                        ?.invitation_bonus_percentages[0]
                                "
                                class="trans_input w-3/4"
                                id="invitation_bonus_percentages_1"
                            />
                            <p class="text-slate-900 text-xl">
                                {{ $t("Lev.1 Bonus(%)") }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-white rounded-md p-4 flex items-center">
                        <img
                            src="../../assets/svgIcons/user_icon.svg"
                            class="w-8 mr-2"
                        />
                        <div class="w-full">
                            <input
                                :value="
                                    settingsData
                                        ?.invitation_bonus_percentages[1]
                                "
                                class="trans_input w-3/4"
                                id="invitation_bonus_percentages_2"
                            />
                            <p class="text-slate-900 text-xl">
                                {{ $t("Lev.2 Bonus(%)") }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-white rounded-md p-4 flex items-center">
                        <img
                            src="../../assets/svgIcons/user_icon.svg"
                            class="w-8 mr-2"
                        />
                        <div class="w-full">
                            <input
                                :value="
                                    settingsData
                                        ?.invitation_bonus_percentages[2]
                                "
                                class="trans_input w-3/4"
                                id="invitation_bonus_percentages_3"
                            />
                            <p class="text-slate-900 text-xl">
                                {{ $t("Lev.3 Bonus(%)") }}
                            </p>
                        </div>
                    </div>
                </div>

                <button @click="onUpdateInvitation" class="button info_button">
                    {{ $t("Update Invitation Bonus") }}
                </button>
            </div>
        </page-wrapper>
    </div>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
import StakingApplicationTable from "../../components/stakingManagement/stakingApplication/StakingApplicationTable.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
    components: {
        PageWrapper,
        StakingApplicationTable,
    },
    setup(props) {
        const store = useStore();

        onMounted(async () => {
            await store.dispatch("settings/fetchSettings");
        });

        const settingsData = computed(
            () => store.getters["settings/getSettings"]
        );

        const getValueById = (id) => {
            return document.getElementById(id).value;
        };

        const onUpdate = () => {
            const contract_address = getValueById("contract_address");
            const usdc_vault = getValueById("usdc_vault");
            store.dispatch("settings/updateSettings", {
                contract_address,
                usdc_vault,
            });
        };
        const onUpdateInvitation = () => {
            store.dispatch("settings/updateSettings", {
                invitation_bonus_percentages: [
                    getValueById("invitation_bonus_percentages_1"),
                    getValueById("invitation_bonus_percentages_2"),
                    getValueById("invitation_bonus_percentages_3"),
                ],
            });
        };

        return {
            settingsData,
            onUpdate,
            onUpdateInvitation,
        };
    },
};
</script>
