<template>
    <tr class="border-b-1">
        <td>{{ parseInt("0x" + application.wallet.slice(-5)) }}</td>
        <td>{{ new Date(application.created_at).toLocaleString("en-us") }}</td>
        <td>{{ new Date(application.ending_at).toLocaleString("en-us") }}</td>
        <td>{{ getEllipsisTxt(application.wallet) }}</td>
        <td>{{ application.duration }} {{ $t("Days") }}</td>
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
            >
                {{ $t("OK") }}
            </button>
            <button class="button delete_button" @click="onCancel">
                {{ $t("Cancel") }}
            </button>
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

        return {
            onConfirm,
            onCancel,
            onEarningPaused,
            getEllipsisTxt,
        };
    },
};
</script>
