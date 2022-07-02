<template>
    <tr class="border-b-1">
        <td>{{ parseInt("0x" + application.wallet.slice(-5)) }}</td>
        <td>{{ new Date(application.created_at).toLocaleString("en-us") }}</td>
        <td>{{ new Date(application.ending_at).toLocaleString("en-us") }}</td>
        <td>{{ getEllipsisTxt(application.wallet) }}</td>
        <td>{{ application.duration }} {{ $t("Days") }}</td>
        <td>
            <input
                :value="application.reward_rate"
                class="trans_input w-32 pointer-events-auto"
                @keyup="onChangeRewardRate"
            />
        </td>
        <td>{{ application.amount }}</td>
        <td>{{ application.customer?.note }}</td>
        <td>{{ application.option }}</td>
        <td>
            <Toggle
                :id="application._id"
                type="error"
                title="Pause earning"
                :value="application.is_paused"
                @toggled="onEarningPaused"
            />
        </td>

        <td>
            <button
                class="button mr-2"
                @click="onConfirm"
                :disabled="application.is_confirmed"
                v-if="!application.is_checked"
            >
                {{ $t("OK") }}
            </button>
            <button
                v-if="!application.is_checked"
                class="button delete_button"
                @click="onCancel"
            >
                {{ $t("Cancel") }}
            </button>
            <span v-if="new Date(application.ending_at) < new Date()"
                >Ended</span
            >
        </td>
    </tr>
</template>

<script>
import { getEllipsisTxt } from "@/utils/formatter";
import Toggle from "@/components/buttons/Toggle.vue";
import { toRaw } from "@vue/reactivity";

export default {
    components: {
        Toggle,
    },
    props: { application: { type: Object, required: true } },
    setup(props, { emit }) {
        const onConfirm = () => {
            emit("confirm", props.application);
        };
        const onCancel = () => {
            emit("cancel", props.application);
        };
        const onEarningPaused = (is_paused) => {
            const updatedApplication = toRaw(props.application);
            emit("updateApplication", { ...updatedApplication, is_paused });
        };
        const onChangeRewardRate = (e) => {
            if (
                e.keyCode === 13 &&
                props.application.reward_rate != e.target.value
            ) {
                emit("updateApplication", {
                    ...props.application,
                    reward_rate: e.target.value,
                });
            }
        };

        return {
            onConfirm,
            onCancel,
            onEarningPaused,
            onChangeRewardRate,
            getEllipsisTxt,
        };
    },
};
</script>
