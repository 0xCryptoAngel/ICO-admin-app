<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import { ref, watch } from 'vue'

import { useRoute } from 'vue-router'
export default {
  name: 'AppLayout',
  setup() {
    const route = useRoute()
    const layout = ref()
    // fetch the user information when params change
    watch(
      () => route.meta,
      async (newMeta) => {
        layout.value = newMeta?.layout || 'layout-main'
      },
    )
    return { layout }
  },
}
</script>
