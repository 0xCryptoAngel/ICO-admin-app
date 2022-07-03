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
                    <option value="6">{{ $t("Invitation Income") }}</option>
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
            <div class="flex pt-6">
                <table>
                    <thead>
                        <th
                            class="py-2 px-2"
                            v-for="(item, index) in result.header"
                            :key="index"
                        >
                            {{ item }}
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="(row, _index) in result.data" :key="_index">
                            <td v-for="(text, _index) in row" :key="_index">
                                {{ text }}
                            </td>
                        </tr>
                    </tbody>
                </table>
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
        const result = ref({ header: [], data: [] });

        const onSearchRecord = async () => {
            if (searchOption.value == 0) return;
            const response = await searchRecord(
                searchOption.value,
                query.value
            );
            result.value = response.data;
        };
        return {
            onSearchRecord,
            searchOption,
            query,
            result,
        };
    },
};
</script>
