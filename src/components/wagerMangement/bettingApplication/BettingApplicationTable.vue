<template>
  <div class="">
    <table class="w-full">
      <thead class="bg-gray-75 text-left uppercase w-full rounded-lg">
        <tr class="text-sm font-bold">
          <th class="py-3 w-5"></th>
          <th class="px-1 py-3 w-88">Betting Time</th>
          <th class="px-1 py-3">Betting End Time</th>
          <th class="px-1 py-3">Wallet Address</th>
          <th class="px-1 py-3">Betting Amount</th>
          <th class="px-1 py-3">Betting revenue category</th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <BettingApplicationRow
          v-for="(link, index) in walletsData"
          :key="index"
          :link="link"
        />
      </tbody>
    </table>
  </div>
</template>
<script>
import BettingApplicationRow from "./BettingApplicationRow.vue";
export default {
  components: { BettingApplicationRow },
  props: {
    walletsData: { type: Array, required: true },
  },
};
</script>
