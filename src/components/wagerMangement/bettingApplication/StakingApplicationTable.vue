<template>
  <div class="">
    <table class="w-full">
      <thead class="bg-gray-75 text-left uppercase w-full rounded-lg">
        <tr class="text-sm font-bold">
          <th class="py-3 w-5"></th>
          <th class="px-1 py-3 w-88">Staking Time</th>
          <th class="px-1 py-3">Staking End Time</th>
          <th class="px-1 py-3">Staking Address</th>
          <th class="px-1 py-3">Staking Amount</th>
          <th class="px-1 py-3">Staking revenue category</th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <StakingApplicationRow
          v-for="(link, index) in applicationsData"
          :key="index"
          :link="link"
        />
      </tbody>
    </table>
  </div>
</template>
<script>
import StakingApplicationRow from "./StakingApplicationRow.vue";
export default {
  components: { StakingApplicationRow },
  props: {
    applicationsData: { type: Array, required: true },
  },
};
</script>
