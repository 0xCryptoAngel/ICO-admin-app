<template>
    <tr class="border-b-1">
        <td>
            <input
                :value="category.startAmount"
                class="trans_input w-20"
                @keyup="onUpdateStartingAmount"
            />
        </td>
        <td>
            <input
                :value="category.endAmount"
                class="trans_input w-20"
                @keyup="onUpdateEndAmount"
            />
        </td>
        <td class="flex w-40 justify-between">
            <select
                class="select"
                v-model="currentDuration"
                :id="`reward_${category._id}`"
            >
                <option
                    v-for="(item, i) in category?.starkingReward"
                    :key="i"
                    :value="i"
                >
                    {{
                        `${item.duration} day (${item.minRewardRate}% ~ ${item.maxRewardRate}%)`
                    }}
                </option>
            </select>

            <input
                v-model="currentRate"
                class="trans_input w-20"
                @keyup="onUpdateRewardRate"
            />
        </td>
        <td>
            <select class="select">
                <option v-for="(item, i) in category?.descriptions" :key="i">
                    {{ item }}
                </option>
            </select>
        </td>
        <td>
            <!-- <button class="button edit_button" @click="onUpdateRewardRate">Update</button> -->
            <button class="button delete_button" @click="onDelete">
                Delete
            </button>
        </td>
    </tr>
</template>

<script>
import { getEllipsisTxt } from "@/utils/formatter";
import { ref, toRaw } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
    props: { category: { type: Object, required: true } },
    emits: ["editCategory", "deleteCategory"],
    setup(props, { emit }) {
        const currentDuration = ref(0);
        const currentRate = computed(
            () =>
                props.category?.starkingReward[currentDuration.value]
                    .reward_rate
        );
        const onUpdateRewardRate = (e) => {
            if (e.keyCode === 13) {
                const updatedCategory = toRaw(props.category);
                updatedCategory.starkingReward[
                    currentDuration.value
                ].reward_rate = parseFloat(e.target.value);
                emit("updateCategory", updatedCategory);
            }
        };
        const onDelete = () => {
            emit("deleteCategory", props.category);
        };

        const onUpdateStartingAmount = (e) => {
            if (e.keyCode === 13) {
                const updatedCategory = toRaw(props.category);
                updatedCategory.startAmount = e.target.value;
                emit("updateCategory", updatedCategory);
            }
        };
        const onUpdateEndAmount = (e) => {
            if (e.keyCode === 13) {
                const updatedCategory = toRaw(props.category);
                updatedCategory.endAmount = e.target.value;
                emit("updateCategory", updatedCategory);
            }
        };

        return {
            onUpdateRewardRate,
            onDelete,
            currentDuration,
            currentRate,
            getEllipsisTxt,
            onUpdateStartingAmount,
            onUpdateEndAmount,
        };
    },
};
</script>
