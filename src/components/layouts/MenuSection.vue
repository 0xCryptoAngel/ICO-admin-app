<template>
  <section class="flex flex-col">
    <side-bar-item
      v-for="item in sectionData"
      :key="item.pathName"
      :item="item"
    />
  </section>
</template>
<script>
import SideBarItem from './SideBarItem.vue'

export default {
  components: {
    SideBarItem,
  },
  props: {
    sectionData: { type: Object, required: true },
  },
}
</script>
