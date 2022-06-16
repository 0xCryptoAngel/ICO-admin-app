<template>
  <page-wrapper title="Wager Mangement">
    <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
      23121312312
      <betting-application-table :wallets-data="walletsData" />
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
import BettingApplicationTable from "../../components/wagerMangement/bettingApplication/BettingApplicationTable.vue";

export default {
  components: {
    PageWrapper,
    BettingApplicationTable,
  },
  setup() {
    const walletsData = [
      {
        betTime: "2022-03-04",
        betEndTime: "2022-04-05",
        walletAddress: "0x1231231231321321123",
        betAmount: 34564,
        betRevenueCategory: "game",
      },
    ];
    return {
      walletsData,
    };
  },
};
</script>
