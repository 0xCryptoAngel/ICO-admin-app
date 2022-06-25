<template>
    <div class="flex flex-col px-10 py-4 space-y-5">
        <h1 class="text-2xl font-bold">
            {{ t(title) }}
        </h1>
        <slot />
    </div>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
    props: {
        title: { type: String, required: true },
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
