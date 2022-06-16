<template>
  <tr class="border-b-1">
    <td class="py-3">
      <input type="checkbox" name="" id="" />
    </td>
    <td>
      {{ link.address }}
    </td>
    <td>
      {{ link.usdcBalance }}
    </td>
    <td>
      {{ link.authorizedDate }}
    </td>
    <td>
      {{ link.authorizedAmount }}
    </td>
    <td>
      {{ link.isAuthorized }}
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
