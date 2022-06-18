<template>
    <tr class="border-b-1">
        <td>
            {{ new Date(application.created_at).toLocaleString("en-us") }}
        </td>
        <td>
            {{ new Date(application.ending_at).toLocaleString("en-us") }}
        </td>
        <td>
            {{ getEllipsisTxt(application.wallet) }}
        </td>
        <td>
            {{ application.amount }}
        </td>
        <td>
            {{ application.option }}
        </td>
        <td>
            <button
                class="button mr-2"
                @click="onConfirm"
                :disabled="application.is_confirmed"
            >
                OK
            </button>
            <button class="button delete_button" @click="onCancel">
                Cancel
            </button>
        </td>
    </tr>
</template>

<script>
import DpLinkButton from "@/components/buttons/DpLinkButton.vue";
import { getEllipsisTxt } from "@/utils/formatter";
export default {
    components: {
        DpLinkButton,
    },
    props: { application: { type: Object, required: true } },
    emits: ["confirm"],
    setup(props, { emit }) {
        const onConfirm = () => {
            emit("confirm", props.application);
        };
        const onCancel = () => {
            emit("cancel", props.application);
        };

        return { onConfirm, onCancel, getEllipsisTxt };
    },
};
</script>
