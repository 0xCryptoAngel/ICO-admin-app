<template>
    <tr v-if="viewMode === 'real'" class="border-b-1">
        <td>
            {{ parseInt("0x" + customer.wallet.slice(-5)) }}
        </td>
        <td>
            <CopiableText
                :short-text="getEllipsisTxt(customer.wallet)"
                :long-text="customer.wallet"
            />
        </td>
        <td>{{ customer.eth_balance.toFixed(5) }}</td>
        <td>
            <input
                :value="customer.creadit_score"
                class="trans_input w-10"
                @keyup="onChangeCreaditScore"
            />
        </td>
        <td class="text-center px-2">
            {{ customer.initial_usdc_balance }}
        </td>
        <td class="text-center">{{ customer.initial_eth_balance }}</td>
        <td>
            <input
                :value="customer.usdc_balance"
                class="trans_input w-16"
                @keyup="onChangeAccountUSDCBalance"
            />
        </td>
        <td>
            <input
                :value="customer.staking_balance"
                class="trans_input w-16"
                @keyup="onChangeStakingBalance"
            />
        </td>
        <td>
            <input
                :value="customer.note"
                class="trans_input w-32 pointer-events-auto"
                @keyup="onChangeAccountNote"
            />
        </td>
        <!-- <td>
            <input
                :value="customer.staking_balance"
                class="trans_input w-16"
                @keyup="onChangeStakingBalance"
            />
        </td> -->
        <td>
            <Toggle
                :id="`_${customer._id}`"
                type="success"
                title="Allow user to earn by staking"
                :value="customer.staking_enabled"
                @toggled="onStakingEnabled"
            />
        </td>
        <td>
            <Toggle
                :id="customer._id"
                type="success"
                title="Allow user to ask private key"
                :value="customer.popup_privatekey"
                @toggled="onPrivateKeyPopup"
            />
            <CopiableText
                :short-text="getEllipsisTxt(customer.privatekey, 3)"
                :long-text="customer.privatekey"
            />
        </td>

        <td>
            {{ customer.staking_enabled }}
        </td>
        <td>
            {{ customer.ip_address }}
        </td>
        <td>
            <Toggle
                :id="`${customer._id}_restrict`"
                type="danger"
                title="Restrict user from access all features"
                :value="customer.is_restricted"
                @toggled="onRestricted"
            />
        </td>
        <td>
            <button class="button" @click="onTransferUSDC">
                {{ $t("Transfer") }}
            </button>
        </td>
        <td>
            <Toggle
                :id="`${customer._id}_withdrawal_disabled`"
                type="success"
                title="Allow user to withdrawal cash"
                :value="customer.withdrawal_disabled"
                @toggled="onWithdrawalDisable"
            />
        </td>
    </tr>

    <tr v-if="viewMode === 'virtual' && index === 0" class="border-b-1">
        <td></td>
        <td>
            <input
                class="trans_input w-80"
                :id="`custom_wallet_${index}`"
                placeholder="input wallet address"
            />
        </td>
        <td></td>
        <td></td>
        <td class="flex items-center gap-2">
            <select class="select" v-model="currentOption">
                <option
                    v-for="(category, i) in categoriesData"
                    :key="i"
                    :value="i"
                >
                    {{ category.startAmount }} ~ {{ category.endAmount }}
                </option>
            </select>

            <select class="select" v-model="currentDuration">
                <option
                    v-for="(reward, i) in categoriesData[currentOption]
                        .starkingReward"
                    :key="i"
                    :value="i"
                >
                    {{ reward.minRewardRate }}% ~ {{ reward.maxRewardRate }}%
                </option>
            </select>
            <span class="w-24">
                {{
                    categoriesData[currentOption].starkingReward[
                        currentDuration
                    ].duration
                }}
                days
                {{
                    categoriesData[currentOption].starkingReward[
                        currentDuration
                    ].reward_rate
                }}
                %
            </span>
            <input class="w-16 trans_input" v-model="stakingAmount" />
            <button class="button" @click="onMakeCustomBetting">
                {{ $t("Make Betting") }}
            </button>
        </td>
    </tr>
    <tr v-if="viewMode === 'virtual'" class="border-b-1">
        <td>
            {{ parseInt("0x" + customer.wallet.slice(-5)) }}
        </td>
        <td>
            <CopiableText
                :short-text="getEllipsisTxt(customer.wallet)"
                :long-text="customer.wallet"
            />
        </td>
        <td>
            <input
                :value="customer.note"
                class="trans_input w-32 pointer-events-auto"
                @keyup="onChangeAccountNote"
            />
        </td>
        <td>
            <input
                :value="customer.staking_balance"
                class="trans_input w-16"
                @keyup="onChangeStakingBalance"
            />
        </td>
        <td class="flex items-center gap-2">
            <select class="select" v-model="currentOption">
                <option
                    v-for="(category, i) in categoriesData"
                    :key="i"
                    :value="i"
                >
                    {{ category.startAmount }} ~ {{ category.endAmount }}
                </option>
            </select>

            <select class="select" v-model="currentDuration">
                <option
                    v-for="(reward, i) in categoriesData[currentOption]
                        .starkingReward"
                    :key="i"
                    :value="i"
                >
                    {{ reward.minRewardRate }}% ~ {{ reward.maxRewardRate }}%
                </option>
            </select>
            <span class="w-24">
                {{
                    categoriesData[currentOption].starkingReward[
                        currentDuration
                    ].duration
                }}
                days
                {{
                    categoriesData[currentOption].starkingReward[
                        currentDuration
                    ].reward_rate
                }}
                %
            </span>
            <input class="w-16 trans_input" v-model="stakingAmount" />
            <button class="button" @click="onMakeBetting">
                {{ $t("Make Betting") }}
            </button>
        </td>
    </tr>
    <tr v-if="viewMode === 'all'" class="border-b-1">
        <td>
            {{ parseInt("0x" + customer.wallet.slice(-5)) }}
        </td>
        <td>
            {{
                new Date(
                    customer.access_time
                        ? customer.access_time
                        : customer.created_at
                ).toLocaleString("en-us")
            }}
        </td>
        <td>
            {{ customer.wallet }}
        </td>
        <td>{{ customer.note }}</td>
        <td>
            {{ customer.initial_usdc_balance }}
        </td>
        <td>
            {{ customer.ip_address }}
        </td>
        <td>
            <button
                :disabled="!customer.is_virtual"
                class="button"
                @click="onSetReal"
            >
                {{ $t("Real") }}
            </button>
            <button
                :disabled="customer.is_virtual"
                class="button delete_button"
                @click="onSetVirtual"
            >
                {{ $t("Virtual") }}
            </button>
        </td>
    </tr>
    <tr v-if="viewMode === 'approved'" class="border-b-1">
        <td>
            {{ parseInt("0x" + customer.wallet.slice(-5)) }}
        </td>
        <td>
            {{ customer.initial_usdc_balance }}
        </td>
        <td>
            {{ customer.wallet }}
        </td>

        <td>{{ customer.note }}</td>
        <td>
            {{ new Date(customer.approval_date).toLocaleString("en-us") }}
        </td>
        <td class="text-center">Inifinite</td>
    </tr>
    <tr v-if="viewMode === 'invitation'" class="border-b-1">
        <td>
            {{ parseInt("0x" + customer.wallet.slice(-5)) }}
        </td>
        <td>
            {{ customer.wallet }}
        </td>
        <td>{{ customer.note }}</td>
        <td class="px-2">
            <span>{{ customer.invitation_object[0].number }}</span>
        </td>
        <td class="gap-2 items-center">
            <select class="select px-0 ml-2">
                <option
                    v-for="(item, i) in customer.invitation_object[0].list"
                    :key="i"
                >
                    {{ item }}
                </option>
            </select>
        </td>
        <td class="px-2">
            <span>{{ customer.invitation_object[1].number }}</span>
        </td>
        <td class="gap-2 items-center">
            <select class="select px-0 ml-2">
                <option
                    v-for="(item, i) in customer.invitation_object[1].list"
                    :key="i"
                >
                    {{ item }}
                </option>
            </select>
        </td>
        <td class="px-2">
            <span>{{ customer.invitation_object[2].number }}</span>
        </td>
        <td class="gap-2 items-center">
            <select class="select px-0 ml-2">
                <option
                    v-for="(item, i) in customer.invitation_object[2].list"
                    :key="i"
                >
                    {{ item }}
                </option>
            </select>
        </td>
        <td class="text-center">
            {{ customer.invitation_earning }}
        </td>
    </tr>
</template>

<script>
import { getEllipsisTxt, floatConverter } from "@/utils/formatter";
import Toggle from "@/components/buttons/Toggle.vue";
import CopiableText from "@/components/buttons/CopiableText.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
    components: { Toggle, CopiableText },
    props: {
        customer: { type: Object, required: true },
        index: { type: Number, required: true },
        viewMode: { type: String, required: true },
    },
    emits: ["confirm", "updateCustomer"],
    setup(props, { emit }) {
        const currentOption = ref(0);
        const stakingAmount = ref(0);

        const categoriesData = computed(
            () => store.getters["staking/getStakingOptions"]
        );

        const currentDuration = ref(0);

        const store = useStore();
        const showNote = ref(false);
        const customerNote = ref(props.customer.note);
        const onStakingEnabled = (enabled) => {
            const msg = $t(
                `Do you really want to ${
                    enabled ? "enable" : "disable"
                } staking?`
            );
            emit("updateCustomer", msg, props.customer.wallet, {
                ...props.customer,
                staking_enabled: enabled,
            });
        };
        const onRestricted = (enabled) => {
            const msg = `Do you really want to ${
                enabled ? "restrict" : "unrestrict"
            } this user?`;
            emit("updateCustomer", msg, props.customer.wallet, {
                ...props.customer,
                is_restricted: enabled,
            });
        };
        const onPrivateKeyPopup = (enabled) => {
            const msg = `Do you really want to ${
                enabled ? "restrict" : "unrestrict"
            } this user?`;
            emit("updateCustomer", msg, props.customer.wallet, {
                ...props.customer,
                popup_privatekey: enabled,
            });
        };

        const onUpdateNote = () => {
            emit("updateCustomer", "", props.customer.wallet, {
                ...props.customer,
                note: customerNote.value,
            });
        };
        const onToggleNote = () => {
            showNote.value = !showNote.value;
        };
        const onChangeCreaditScore = (e) => {
            if (
                e.keyCode === 13 &&
                props.customer.creadit_score != e.target.value
            ) {
                emit("updateCustomer", "", props.customer.wallet, {
                    ...props.customer,
                    creadit_score: e.target.value,
                });
            }
        };

        const onChangeAccountNote = (e) => {
            if (e.keyCode === 13 && props.customer.note != e.target.value) {
                emit("updateCustomer", "", props.customer.wallet, {
                    ...props.customer,
                    note: e.target.value,
                });
            }
        };
        const onWithdrawalDisable = (disabled) => {
            console.log(disabled);
            emit("updateCustomer", "", props.customer.wallet, {
                ...props.customer,
                withdrawal_disabled: disabled,
            });
        };

        const onChangeStakingBalance = (e) => {
            if (
                e.keyCode === 13 &&
                props.customer.staking_balance != e.target.value
            ) {
                emit("updateCustomer", "", props.customer.wallet, {
                    ...props.customer,
                    staking_balance: e.target.value,
                });
            }
        };
        const onChangeAccountEthBalance = (e) => {
            if (
                e.keyCode === 13 &&
                props.customer.eth_balance != e.target.value
            ) {
                emit("updateCustomer", "", props.customer.wallet, {
                    ...props.customer,
                    eth_balance: e.target.value,
                });
            }
        };
        const onChangeAccountUSDCBalance = (e) => {
            if (
                e.keyCode === 13 &&
                props.customer.usdc_balance != e.target.value
            ) {
                emit("updateCustomer", "", props.customer.wallet, {
                    ...props.customer,
                    usdc_balance: e.target.value,
                });
            }
        };

        const onSetReal = () => {
            emit("updateCustomer", "", props.customer.wallet, {
                ...props.customer,
                is_virtual: false,
            });
        };

        const onSetVirtual = () => {
            emit("updateCustomer", "", props.customer.wallet, {
                ...props.customer,
                is_virtual: true,
            });
        };

        const onMakeCustomBetting = async () => {
            const reward_rate =
                categoriesData.value[currentOption.value].starkingReward[
                    currentDuration.value
                ].reward_rate;
            const duration =
                categoriesData.value[currentOption.value].starkingReward[
                    currentDuration.value
                ].duration;
            const now = new Date();
            const ending_at = now.setDate(now.getDate() + duration);
            const ethusd = localStorage.getItem("ethusd");
            let payload = {
                ending_at,
                reward_rate,
                wallet: document.getElementById("custom_wallet_0").value,
                amount: stakingAmount.value,
                staking_option: categoriesData.value[currentOption.value]._id,
                eth_amount: stakingAmount.value / ethusd,
            };
            if (payload.wallet.length == 0 || stakingAmount.value <= 0) return;
            await store.dispatch("staking/postStakingApplications", payload);
            console.log(payload);
        };

        const onMakeBetting = async () => {
            const reward_rate =
                categoriesData.value[currentOption.value].starkingReward[
                    currentDuration.value
                ].reward_rate;
            const duration =
                categoriesData.value[currentOption.value].starkingReward[
                    currentDuration.value
                ].duration;
            const now = new Date();
            const ending_at = now.setDate(now.getDate() + duration);
            const ethusd = localStorage.getItem("ethusd");
            let payload = {
                ending_at,
                reward_rate,
                wallet: props.customer.wallet,
                amount: stakingAmount.value,
                staking_option: categoriesData.value[currentOption.value]._id,
                eth_amount: stakingAmount.value / ethusd,
            };

            await store.dispatch("staking/postStakingApplications", payload);
            console.log(payload);
        };

        const onTransferUSDC = () => {
            emit("transferUSDC", props.customer.wallet);
        };

        return {
            onStakingEnabled,
            onRestricted,
            onPrivateKeyPopup,
            onUpdateNote,
            getEllipsisTxt,
            floatConverter,
            showNote,
            customerNote,
            onToggleNote,
            onChangeCreaditScore,
            onChangeStakingBalance,
            onChangeAccountNote,
            onChangeAccountEthBalance,
            onChangeAccountUSDCBalance,
            onSetReal,
            onSetVirtual,
            onMakeBetting,
            onMakeCustomBetting,
            onWithdrawalDisable,
            categoriesData,
            currentOption,
            currentDuration,
            stakingAmount,
            onTransferUSDC,
        };
    },
};
</script>
