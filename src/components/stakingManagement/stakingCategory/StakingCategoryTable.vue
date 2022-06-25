<template>
    <div class="">
        <table class="w-full">
            <thead>
                <tr class="text-sm font-bold">
                    <th>{{ t("Min Amount") }}</th>
                    <th>{{ t("Max Amount") }}</th>
                    <th>{{ t("Rewards") }}</th>
                    <th>{{ t("Desciptions") }}</th>
                    <th>{{ t("Action") }}</th>
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
import { useI18n } from "vue-i18n";
import StakingCategoryRow from "./StakingCategoryRow.vue";
export default {
    components: { StakingCategoryRow },
    props: {
        categoriesData: { type: Array, required: true },
    },
    setup() {
        const { locale, t } = useI18n({
            inheritLocale: true,
        });
        return {
            locale,
            t,
        };
    },
};
</script>
