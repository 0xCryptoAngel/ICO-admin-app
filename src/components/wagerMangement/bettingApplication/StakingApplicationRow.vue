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
        <td class="py-3">
            <button
                class="confirm_button"
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

<style lang="postcss">
.confirm_button {
    @apply text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
    @apply disabled:cursor-not-allowed disabled:bg-gray-500;
}
</style>
