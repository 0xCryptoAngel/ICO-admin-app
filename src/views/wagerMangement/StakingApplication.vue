<template>
  <page-wrapper title="Staking Application">
    <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
      <staking-application-table :applications-data="applicationsData" />
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
import StakingApplicationTable from "../../components/wagerMangement/bettingApplication/StakingApplicationTable.vue";

export default {
  components: {
    PageWrapper,
    StakingApplicationTable,
  },
  setup() {
    const applicationsData = [
      {
        betTime: "2022-03-04",
        betEndTime: "2022-04-05",
        walletAddress: "0x1231231231321321123",
        betAmount: 34564,
        betRevenueCategory: "game",
      },
    ];
    return {
      applicationsData,
    };
  },
};
</script>
