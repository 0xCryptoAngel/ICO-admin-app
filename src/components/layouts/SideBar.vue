<template>
  <!-- Sidebar -->
  <nav class="w-44">
    <app-icon />
    <menu-section :section-data="menuItems.mainSection" />
  </nav>
</template>
<script>
import MenuSection from './MenuSection.vue'
import appIcon from './appIcon.vue'
import menuItems from '@/data/menu.json'
import { useRoute } from 'vue-router'

export default {
  components: {
    MenuSection,
    appIcon,
  },
  setup() {
    const route = useRoute()
    return {
      menuItems,
    }
  },
}
</script>
