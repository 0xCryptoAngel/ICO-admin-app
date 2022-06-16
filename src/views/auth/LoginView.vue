<template>
  <login-page-wrapper>
    <login-form />
  </login-page-wrapper>
</template>

<script>
import LoginPageWrapper from '@/components/auth/LoginPageWrapper.vue'
import LoginForm from '@/components/auth/LoginForm.vue'

export default {
  components: {
    LoginPageWrapper,
    LoginForm,
  },
}
</script>

