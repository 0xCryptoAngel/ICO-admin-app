<template>
  <page-wrapper title="Добавить склад">
    <CreateBoby/>
  </page-wrapper>
</template>

<script>
import CreateBoby from '@/components/wareHouses/CreateBoby.vue'
import PageWrapper from '@/components/PageWrapper.vue'

export default {
  components: {
    PageWrapper,
    CreateBoby,
  },
}
</script>
