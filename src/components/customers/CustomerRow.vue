<template>
    <tr class="border-b-1">
        <td>
            <CopiableText
                :short-text="getEllipsisTxt(customer.wallet)"
                :long-text="customer.wallet"
            />
        </td>
        <td>
            <input
                :value="customer.creadit_score"
                class="trans_input w-fit"
                @keyup="onChangeCreaditScore"
            />
        </td>
        <td>
            {{ customer.usdc_balance }}
        </td>
        <td>
            {{ floatConverter(customer.eth_balance) }}
        </td>
        <td>
            {{ customer.account_balance }}
        </td>
        <td>
            <Toggle
                :id="customer._id"
                type="success"
                title="Allow user to earn by staking"
                :value="customer.staking_enabled"
                @toggled="onStakingEnabled"
            />
        </td>
        <td>
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
            <SvgIcon
                @click="onToggleNote"
                class="w-8 h-8 rounded-none p-1 button"
                name="note"
            />
        </td>
    </tr>
    <tr v-if="showNote">
        <td colspan="9">
            <textarea class="textarea" rows="5" v-model="customerNote">
            </textarea>
        </td>
        <td>
            <button class="button" @click="onUpdateNote">Update</button>
        </td>
    </tr>
</template>

<script>
import { getEllipsisTxt, floatConverter } from "@/utils/formatter";
import Toggle from "@/components/buttons/Toggle.vue";
import CopiableText from "@/components/buttons/CopiableText.vue";
import { ref } from "@vue/reactivity";

export default {
    components: { Toggle, CopiableText },
    props: { customer: { type: Object, required: true } },
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

        return {
            onStakingEnabled,
            onRestricted,
            onUpdateNote,
            getEllipsisTxt,
            floatConverter,
            showNote,
            customerNote,
            onToggleNote,
            onChangeCreaditScore,
        };
    },
};
</script>
