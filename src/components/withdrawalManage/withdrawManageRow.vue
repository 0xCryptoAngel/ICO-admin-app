<template>
    <tr class="border-b-1">
        <td class="py-3">
            {{ new Date(withdrawal.created_at).toLocaleString("en-us") }}
        </td>
        <td>
            {{ withdrawal.amount }}
        </td>
        <td>
            {{ withdrawal.wallet }}
        </td>
        <td>
            <button
                class="button"
                @click="onConfirm"
                :disabled="withdrawal.is_confirmed"
            >
                {{ withdrawal.is_confirmed ? "Confirmed" : "Confirm" }}
            </button>
        </td>
    </tr>
</template>

<script>
import { getEllipsisTxt } from "@/utils/formatter";

export default {
    components: {},
    props: { withdrawal: { type: Object, required: true } },
    emits: ["confirm"],
    setup(props, { emit }) {
        const onConfirm = () => {
            emit("confirm", props.withdrawal);
        };
        return { onConfirm, getEllipsisTxt };
    },
};
</script>
