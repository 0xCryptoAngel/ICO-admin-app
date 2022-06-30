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
                v-if="!withdrawal.is_checked"
                @click="onConfirm(true)"
            >
                {{ $t("Pass") }}
            </button>
            <button
                v-if="!withdrawal.is_checked"
                class="button delete_button"
                @click="onConfirm(false)"
            >
                {{ $t("No Pass") }}
            </button>
            <span v-if="withdrawal.is_checked">{{
                withdrawal.is_confirmed ? $t("Pass") : $t("No Pass")
            }}</span>
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
