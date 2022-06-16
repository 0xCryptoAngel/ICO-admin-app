<template>
    <tr class="border-b-1">
        <td>${{ category.startAmount }}</td>
        <td>${{ category.endAmount }}</td>
        <td>
            <select class="select">
                <option v-for="(item, i) in category?.starkingReward" :key="i">
                    {{
                        `${item.duration} day (${item.minRewardRate}% ~ ${item.maxRewardRate}%)`
                    }}
                </option>
            </select>
        </td>
        <td>
            <select class="select">
                <option v-for="(item, i) in category?.descriptions" :key="i">
                    {{ item }}
                </option>
            </select>
        </td>
        <td>
            <button v-if="1 == 0" class="button edit_button" @click="onEdit">
                Edit
            </button>
            <button class="button delete_button" @click="onDelete">
                Delete
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
    props: { category: { type: Object, required: true } },
    emits: ["editCategory", "deleteCategory"],
    setup(props, { emit }) {
        const onEdit = () => {
            emit("editCategory", props.category);
        };
        const onDelete = () => {
            emit("deleteCategory", props.category);
        };

        return { onEdit, onDelete, getEllipsisTxt };
    },
};
</script>
