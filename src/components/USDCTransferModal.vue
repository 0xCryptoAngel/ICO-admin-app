<template>
    <div class="ace-modal-container">
        <div class="ace-modal">
            <div class="ace-modal-content text-white">
                <h1
                    class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
                >
                    {{ t("USDC Transfer") }}
                </h1>
            </div>
        </div>
    </div>
</template>
<script>
import { useI18n } from "vue-i18n";
export default {
    props: {},
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
