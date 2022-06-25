<template>
    <tr class="border-b-1">
        <td>{{ parseInt("0x" + withdrawal.wallet.slice(-5)) }}</td>
        <td class="py-3">
            {{ new Date(withdrawal.created_at).toLocaleString("en-us") }}
        </td>
        <td>
            {{ withdrawal.amount }}
        </td>
        <td>
            <CopiableText
                :short-text="withdrawal.wallet"
                :long-text="withdrawal.wallet"
            />
        </td>
        <td>
            {{ note }}
        </td>
        <td>
            <button
                class="button mr-2"
                :disabled="withdrawal.is_checked && withdrawal.is_confirmed"
                @click="onConfirm(true)"
            >
                Pass
            </button>
            <button
                :disabled="withdrawal.is_checked && !withdrawal.is_confirmed"
                class="button delete_button"
                @click="onConfirm(false)"
            >
                No Pass
            </button>
        </td>
    </tr>
</template>

<script>
import { getEllipsisTxt } from "@/utils/formatter";
import CopiableText from "@/components/buttons/CopiableText.vue";
export default {
    components: { CopiableText },
    props: {
        withdrawal: { type: Object, required: true },
        note: { type: String, required: true },
    },
    emits: ["confirm"],
    setup(props, { emit }) {
        const onConfirm = (is_confirmed) => {
            emit("confirm", { withdrawal: props.withdrawal, is_confirmed });
        };
        return { onConfirm, getEllipsisTxt };
    },
};
</script>
