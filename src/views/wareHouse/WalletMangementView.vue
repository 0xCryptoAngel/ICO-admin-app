<template>
  <page-wrapper title="Wallets">
    <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
      <div class="flex justify-start">
        <h1 class="text-lg font-bold">Wallets Mangement</h1>
      </div>
      <wallets-table :wallets-data="walletsData" />
      <pagination
        :totalPages="10"
        :currentPage="currentPage"
        @pagechanged="onPageChange"
      />
    </div>
  </page-wrapper>
</template>

<script>
import WalletsTable from "@/components/wareHouses/WalletsTable.vue";
import PageWrapper from "@/components/PageWrapper.vue";
import Pagination from "@/components/utils/pagination.vue";
import DpLinkButton from "@/components/buttons/DpLinkButton.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  components: {
    PageWrapper,
    WalletsTable,
    DpLinkButton,
    Pagination,
  },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const errorMessage = ref("");
    const currentPage = ref(1);
    const onPageChange = async (page) => {
      currentPage.value = page;
      await store.dispatch("warehouse/fetchWarehouse", currentPage.value);
    };
    onMounted(async () => {
      errorMessage.value = "";
      loading.value = true;
      await store.dispatch("warehouse/fetchWarehouse", currentPage.value);
      loading.value = false;
    });

    // const wareHouses = computed(
    //   () => store.getters["warehouse/getWareHousesList"]
    // );
    const walletsData = [
      {
        address: "0x1231231231321321123",
        usdcBalance: 34564,
        authorizedDate: "2022-5-5",
        authorizedAmount: 57484,
        isAuthorized: true,
      },
    ];
    return {
      currentPage,
      onPageChange,
      walletsData,
      loading,
      errorMessage,
    };
  },
};
</script>
