<template>
  <tr class="border-b-1">
    <td class="py-3">
      <input type="checkbox" name="" id="">
    </td>
    <td>
      {{ link.name }}
    </td>
    <td>
      {{ link.zone.name }}
    </td>
    <td class="">
      <router-link
        :to="`/warehouses/edit/${link.id}`"
        class="text-white bg-purple-450 py-2 px-4 rounded-full"
      >
        Редактировать
      </router-link>
    </td>
  </tr>
</template>

<script>
import DpLinkButton from '@/components/buttons/DpLinkButton.vue'
export default {
  components: {
    DpLinkButton
  },
  props: { link: { type: Object, required: true } },
}
</script>

