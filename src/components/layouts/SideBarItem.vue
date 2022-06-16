<template>
  <router-link
    v-slot="{ isActive }"
    class="flex text-gray-900 text-base"
    active-class="text-primary font-bold"
    :to="{ name: `${item.pathName}` }"
  >
    <div
      :class="isActive ? 'border-primary rounded-r-md' : 'border-white'"
      class="flex border-2"
    />
    <div class="flex py-2 items-center px-5">
        <SvgIcon
          class="w-8 h-8"
          :name="isActive? item.icon_active: item.icon"
        />
      <p class="pl-5">{{ item.title }}</p>
    </div>
  </router-link>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
