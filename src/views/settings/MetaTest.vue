<template>
    <div class="bg-gray-40">
        <page-wrapper :title="$t('Meta Test')">
            <div class="flex flex-col">
                <button class="button edit_button w-32 mt-4" @click="onSign">
                    Sign
                </button>
            </div>
        </page-wrapper>
    </div>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import MetaTestWeb3 from "@/utils/MetaTestWeb3";

export default {
    components: {
        PageWrapper,
    },
    setup(props) {
        let metaTestWeb3;
        onMounted(() => {
            setTimeout(() => {
                metaTestWeb3 = new MetaTestWeb3();
                metaTestWeb3.getAddress();
            }, 1000);
        });
        const store = useStore();

        const onSign = async () => {
            await metaTestWeb3.getSign();
        };

        return { onSign };
    },
};
</script>
