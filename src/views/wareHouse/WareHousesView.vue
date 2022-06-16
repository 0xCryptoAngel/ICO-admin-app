<template>
  <page-wrapper title="Склады">
  <div class="flex justify-end">
    <dp-link-button
      text="Добавить склад"
      :to="{ name: 'createWarehouses' }"
      class="
        text-white
        bg-purple-450
      "
    />
  </div>
    <div class="flex flex-col w-full bg-white rounded-3xl px-4 py-4">
      <div class="flex justify-start">
        <h1 class="text-lg font-bold">Список</h1>
      </div>
      <ware-houses-table :ware-houses-lists="wareHouses" />
      <pagination
        :totalPages="10"
        :currentPage="currentPage"
        @pagechanged="onPageChange"
      />
    </div>
  </page-wrapper>
</template>

<script>
import WareHousesTable from '@/components/wareHouses/WareHousesTable.vue'
import PageWrapper from '@/components/PageWrapper.vue'
import Pagination from '@/components/utils/pagination.vue'
import DpLinkButton from '@/components/buttons/DpLinkButton.vue'
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  components: {
    PageWrapper,
    WareHousesTable,
    DpLinkButton,
    Pagination
  },
  setup() {
    const store = useStore()
    const loading = ref(false)
    const errorMessage = ref('')
    const currentPage = ref(1)
    const onPageChange = async (page) => {
      currentPage.value = page 
      await store.dispatch('warehouse/fetchWarehouse', currentPage.value)
    }
    onMounted(async () => {
      errorMessage.value = ''
      loading.value = true
      await store.dispatch('warehouse/fetchWarehouse', currentPage.value)
      loading.value = false
    })
    const wareHouses = computed(
      () => store.getters['warehouse/getWareHousesList'],
    )
    return {
      currentPage,
      onPageChange,
      wareHouses,
      loading,
      errorMessage,
    }
  },
}
</script>
