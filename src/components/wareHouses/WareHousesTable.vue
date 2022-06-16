<template>
  <div class="">
    <table class="w-full">
      <thead class="bg-gray-75 text-left uppercase w-full rounded-lg">
        <tr class="text-sm font-bold">
          <th class="py-3 w-5"></th>
          <th class="px-1 py-3">Название склада</th>
          <th class="px-1 py-3 w-80">Гео-зона</th>
          <th class="px-1 py-3 w-12">Действия</th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <WareHousesRow
          v-for="(link, index) in wareHousesLists.items"
          :key="index"
          :link="link"
        />
      </tbody>
    </table>
  </div>
</template>
<script>

import WareHousesRow from './WareHousesRow.vue'
export default {
  components: { WareHousesRow },
  props: {
    wareHousesLists: { type: Array, required: true },
  },
   
}
</script>