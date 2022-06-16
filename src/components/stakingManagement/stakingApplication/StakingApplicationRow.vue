<template>
    <tr class="border-b-1">
        <td>
            {{ new Date(link.created_at).toLocaleString("en-us") }}
        </td>
        <td>
            {{ new Date(link.ending_at).toLocaleString("en-us") }}
        </td>
        <td>
            {{ getEllipsisTxt(link.wallet) }}
        </td>
        <td>
            {{ link.amount }}
        </td>
        <td>
            {{ link.option }}
        </td>
        <td>
            <button
                class="button"
                @click="onConfirm"
                :disabled="link.is_confirmed"
            >
                {{ link.is_confirmed ? "Confirmed" : "Confirm" }}
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
    props: { link: { type: Object, required: true } },
    emits: ["confirm"],
    setup(props, { emit }) {
        const onConfirm = () => {
            emit("confirm", props.link);
        };
        return { onConfirm, getEllipsisTxt };
    },
};
</script>
