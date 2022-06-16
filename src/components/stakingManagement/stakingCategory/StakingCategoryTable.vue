<template>
    <div class="">
        <table class="w-full">
            <thead>
                <tr class="text-sm font-bold">
                    <th>Min Amount</th>
                    <th>Max Amount</th>
                    <th>Rewards</th>
                    <th>Desciptions</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <StakingCategoryRow
                    v-bind="$attrs"
                    v-for="(category, index) in categoriesData"
                    :key="index"
                    :category="category"
                />
            </tbody>
        </table>
    </div>
</template>
<script>
import StakingCategoryRow from "./StakingCategoryRow.vue";
export default {
    components: { StakingCategoryRow },
    props: {
        categoriesData: { type: Array, required: true },
    },
};
</script>
