<template>
    <page-wrapper title="Staking Categories">
        <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
            <staking-category-table
                @updateCategory="onUpdateCategory"
                @deleteCategory="onDeleteCategory"
                :categories-data="categoriesData"
            />
        </div>
    </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
import StakingCategoryTable from "../../components/stakingManagement/stakingCategory/StakingCategoryTable.vue";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
    components: {
        PageWrapper,
        StakingCategoryTable,
    },
    setup() {
        const store = useStore();
        onMounted(async () => {
            store.dispatch("staking/fetchStakingOptions");
        });

        const categoriesData = computed(
            () => store.getters["staking/getStakingOptions"]
        );

        const onUpdateCategory = (category) => {
            store.dispatch("staking/updateStakingOption", category);
        };
        const onDeleteCategory = (category) => {
            console.log(category);
        };

        return {
            categoriesData,
            onUpdateCategory,
            onDeleteCategory,
        };
    },
};
</script>
