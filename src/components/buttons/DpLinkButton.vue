<template>
  <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
  <router-link class="py-3 px-4 rounded-full">{{ text }}<slot /></router-link>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>