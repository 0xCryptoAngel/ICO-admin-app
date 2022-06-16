<template>
  <div class="relative min-h-screen flex">
    <side-bar v-if="showSideNav || !isBuilder" />

    <main class="flex-1">
      <div class="flex bg-gray-75 flex-row">
        <div
          class="flex flex-col w-full min-h-screen bg-gray-40"
        >
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from '@/components/layouts/SideBar.vue'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

export default {
  components: {
    SideBar,
  },
  setup() {
    const route = useRoute()
    const isBuilder = computed(() => route.name === 'dashboard')
    const isWarehouses = computed(() => route.name === 'warehouses')
    const isDrivers = computed(() => route.name === 'drivers')
    const showSideNav = ref(true)

    const showUpdatedSideBar = computed(
      () => isWarehouses.value || isDrivers.value || !showSideNav.value,
    )

    return {
      isBuilder,
      showSideNav,
      showUpdatedSideBar,
    }
  },
}
</script>

<style scoped>
.padding-75px {
  padding-left: 75px;
}
</style>
