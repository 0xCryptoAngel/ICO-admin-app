<template>
  <div class="">
    <table class="w-full">
      <thead class="bg-gray-75 text-left uppercase w-full rounded-lg">
        <tr class="text-sm font-bold">
          <th class="py-3 w-5"></th>
          <th class="px-1 py-3 w-88">Access Time</th>
          <th class="px-1 py-3">access to the web page user wallet address</th>
          <th class="px-1 py-3">wallet USDC balance</th>
          <th class="px-1 py-3">visitor IP address</th>
          <th class="px-1 py-3">access times</th>
          <th class="px-1 py-3">whether to add to the user management</th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <WithdrawalManageRow
          v-for="(link, index) in browsingUsersData"
          :key="index"
          :link="link"
        />
      </tbody>
    </table>
  </div>
</template>
<script>
import WithdrawalManageRow from "./withdrawManageRow.vue";
export default {
  components: { WithdrawalManageRow },
  props: {
    browsingUsersData: { type: Array, required: true },
  },
};
</script>
