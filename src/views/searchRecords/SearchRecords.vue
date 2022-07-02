<template>
    <page-wrapper title="Search Records">
        <div class="flex flex-col w-full rounded-3xl px-4 py-4">
            <div class="flex items-center gap-8">
                <select class="select" v-model="searchOption">
                    <option value="0"></option>
                    <option value="1">{{ $t("USDC Transfer") }}</option>
                    <option value="2">{{ $t("Eth-USDC Conversion") }}</option>
                    <option value="3">{{ $t("Staking Income") }}</option>
                    <option value="4">{{ $t("Staking Application") }}</option>
                    <option value="5">{{ $t("Withdrawal") }}</option>
                </select>
                <input
                    v-model="query"
                    placeholder="User ID or User Wallet Address"
                    class="search-input w-80 my-0"
                />
                <button class="button w-32 h-10" @click="onSearchRecord">
                    {{ $t("Search") }}
                </button>
            </div>
        </div>
    </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
import { searchRecord } from "@/api/searchRecord.api";
import { ref } from "@vue/reactivity";
export default {
    components: {
        PageWrapper,
    },
    setup() {
        const searchOption = ref("");
        const query = ref("");

        const onSearchRecord = async () => {
            const response = await searchRecord(
                searchOption.value,
                query.value
            );
            console.log(searchOption.value, query.value, response.data);
        };
        return {
            onSearchRecord,
            searchOption,
            query,
        };
    },
};
</script>
