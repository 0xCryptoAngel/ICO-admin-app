<template>
    <div class="">
        <table class="w-full">
            <thead class="bg-gray-75 text-left uppercase w-full rounded-lg">
                <tr class="text-sm font-bold">
                    <th>{{ t("No") }}</th>
                    <th>{{ t("TIME") }}</th>
                    <th>{{ t("Amount") }}</th>
                    <th>{{ t("WALLET ADDRESS") }}</th>
                    <th>{{ t("Note") }}</th>
                    <th>{{ t("ACTIONS") }}</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <WithdrawalManageRow
                    v-bind="$attrs"
                    v-for="(withdrawal, index) in withdrawals"
                    :key="index"
                    :withdrawal="withdrawal"
                    :note="
                        customerData.find(
                            (item) => item.wallet == withdrawal.wallet
                        )?.note
                    "
                />
            </tbody>
        </table>
    </div>
</template>
<script>
import { useI18n } from "vue-i18n";
import WithdrawalManageRow from "./withdrawManageRow.vue";
export default {
    components: { WithdrawalManageRow },
    props: {
        withdrawals: { type: Array, required: true },
        customerData: { type: Array, required: true },
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
