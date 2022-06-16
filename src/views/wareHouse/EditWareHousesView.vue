<template>
  <page-wrapper title="Редактировать водителя">
    <EditBoby :wareHousesId="wareHousesId"/>
  </page-wrapper>
</template>

<script>
import EditBoby from '@/components/wareHouses/EditBoby.vue'
import PageWrapper from '@/components/PageWrapper.vue'
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
export default {
  components: {
    PageWrapper,
    EditBoby,
  },
   setup() {
    const route = useRoute()
    const wareHousesId = computed(() => route.params.id)
    return {
      wareHousesId,
    }
  },
}
</script>
