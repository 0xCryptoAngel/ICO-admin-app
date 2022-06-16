<template>
  <login-page-wrapper>
    <signup-form />
  </login-page-wrapper>
</template>

<script>
import LoginPageWrapper from "@/components/auth/LoginPageWrapper.vue";
import SignupForm from "@/components/auth/SignupForm.vue";

export default {
  components: {
    LoginPageWrapper,
    SignupForm,
  },
};
</script>
