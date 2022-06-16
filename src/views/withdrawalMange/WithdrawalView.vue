<template>
  <page-wrapper title="Wallets">
    <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
      <div class="flex justify-start">
        <h1 class="text-lg font-bold">Browsing Users</h1>
      </div>
      <Withdraw-Manage-Table :browsing-users-data="browsingUsersData" />
      <pagination
        :totalPages="10"
        :currentPage="currentPage"
        @pagechanged="onPageChange"
      />
    </div>
  </page-wrapper>
</template>

<script>
import WithdrawManageTable from "@/components/withdrawalManage/withdrawManageTable.vue";
import PageWrapper from "@/components/PageWrapper.vue";
import Pagination from "@/components/utils/pagination.vue";
import DpLinkButton from "@/components/buttons/DpLinkButton.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  components: {
    PageWrapper,
    DpLinkButton,
    Pagination,
    WithdrawManageTable,
  },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const errorMessage = ref("");
    const currentPage = ref(1);

    onMounted(async () => {
      errorMessage.value = "";
      loading.value = true;
      await store.dispatch("withdrawal/fetchWithdrawalList", currentPage.value);
      loading.value = false;
    });

    const browsingUsersData = computed(
      () => store.getters["withdrawal/getWithdrawalList"]
    );
    console.log("browsingUsersData", browsingUsersData);
    // const browsingUsersData = [
    //   {
    //     accessTime: "2022-6-13",
    //     walletAddress: "0x1231231231321321123",
    //     usdcBalance: 34564,
    //     authorizedDate: "2022-5-5",
    //     ipAddress: "191.253.245.555",
    //     accessTimes: 20,
    //     isAdd: true,
    //   },
    // ];
    return {
      currentPage,
      browsingUsersData,
      loading,
      errorMessage,
    };
  },
};
</script>
