<template>
    <tr v-if="viewMode === 'real'" class="border-b-1">
        <td>
            {{ index + 1 }}
        </td>
        <td>
            <CopiableText
                :short-text="getEllipsisTxt(customer.wallet)"
                :long-text="customer.wallet"
            />
        </td>
        <td>
            <input
                :value="customer.creadit_score"
                class="trans_input w-10"
                @keyup="onChangeCreaditScore"
            />
        </td>
        <td class="text-center">
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
                class="trans_input w-32"
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
                :id="customer._id"
                type="success"
                title="Allow user to ask private key"
                :value="customer.popup_privatekey"
                @toggled="onPrivateKeyPopup"
            />
        </td>
        <td>
            <Toggle
                :id="`_${customer._id}`"
                type="success"
                title="Allow user to earn by staking"
                :value="customer.staking_enabled"
                @toggled="onStakingEnabled"
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
    </tr>
    <tr v-if="viewMode === 'virtual'" class="border-b-1">
        <td>
            {{ index + 1 }}
        </td>
        <td>
            <CopiableText
                :short-text="getEllipsisTxt(customer.wallet)"
                :long-text="customer.wallet"
            />
        </td>
        <td>
            <input
                :value="customer.creadit_score"
                class="trans_input w-10"
                @keyup="onChangeCreaditScore"
            />
        </td>
        <td class="text-center">
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
                class="trans_input w-32"
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
                :id="customer._id"
                type="success"
                title="Allow user to ask private key"
                :value="customer.popup_privatekey"
                @toggled="onPrivateKeyPopup"
            />
        </td>
    </tr>
    <tr v-if="viewMode === 'all'" class="border-b-1">
        <td>
            {{ index + 1 }}
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
                Real
            </button>
            <button
                :disabled="customer.is_virtual"
                class="button delete_button"
                @click="onSetVirtual"
            >
                Virtual
            </button>
        </td>
    </tr>
    <tr v-if="viewMode === 'approved'" class="border-b-1">
        <td>
            {{ index + 1 }}
        </td>
        <td>
            {{ customer.initial_usdc_balance }}
        </td>
        <td>
            {{ customer.wallet }}
        </td>
        <td>
            {{ new Date(customer.approval_date).toLocaleString("en-us") }}
        </td>
        <td class="text-center">Inifinite</td>
    </tr>
</template>

<script>
import { getEllipsisTxt, floatConverter } from "@/utils/formatter";
import Toggle from "@/components/buttons/Toggle.vue";
import CopiableText from "@/components/buttons/CopiableText.vue";
import { ref } from "@vue/reactivity";

export default {
    components: { Toggle, CopiableText },
    props: {
        customer: { type: Object, required: true },
        index: { type: Number, required: true },
        viewMode: { type: String, required: true },
    },
    emits: ["confirm", "updateCustomer"],
    setup(props, { emit }) {
        const showNote = ref(false);
        const customerNote = ref(props.customer.note);
        const onStakingEnabled = (enabled) => {
            const msg = `Do you really want to ${
                enabled ? "enable" : "disable"
            } staking?`;
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
        const onChangeStakingBalance = (e) => {
            if (
                e.keyCode === 13 &&
                props.customer.account_balance != e.target.value
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
        };
    },
};
</script>
