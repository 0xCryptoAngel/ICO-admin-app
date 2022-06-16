<template>
  <tr class="border-b-1">
    <td class="py-3">
      <input type="checkbox" name="" id="" />
    </td>
    <td>
      {{ link.accessTime }}
    </td>
    <td>
      {{ link.walletAddress }}
    </td>
    <td>
      {{ link.usdcBalance }}
    </td>
    <td>
      {{ link.ipAddress }}
    </td>
    <td>
      {{ link.accessTimes }}
    </td>
    <td>
      {{ link.isAdd }}
    </td>
  </tr>
</template>

<script>
import DpLinkButton from "@/components/buttons/DpLinkButton.vue";
export default {
  components: {
    DpLinkButton,
  },
  props: { link: { type: Object, required: true } },
};
</script>
