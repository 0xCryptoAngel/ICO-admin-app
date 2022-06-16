<template>
  <section class="flex flex-col items-center my-auto w-full px-14 py-8">
    <header class="font-medium text-xl">Введите данные для авторизации</header>
    <form
      class="max-w-md w-full mt-8 mb-4 space-y-6"
      @submit.prevent="signIn()"
    >
      <login-input
        id="email"
        v-model="username"
        type="email"
        label="Логин"
        placeholder="Your Email / Username"
      />
      <login-input
        id="password"
        v-model="password"
        type="password"
        label="Пароль"
        placeholder="Enter Password"
      />
      <div class="flex justify-center">
        <dp-button
          :text="!signInLoading ? 'Войти' : 'Войти ...'"
          :loading="signInLoading"
          :disabled="signInDisabled"
          type="submit"
          class="
            py-2
            w-36
            uppercase
            text-white
            bg-purple-450
            bg-secondary
            disabled:opacity-50
          "
        />
      </div>
    </form>
    <p class="text-red-500 mt-1 w-full min-h-6">{{ errorMessage }}</p>
  </section>
</template>
<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import LoginInput from '@/components/inputs/LoginInput.vue'
import DpButton from '../buttons/DpButton.vue'
export default {
  components: { DpButton, LoginInput },

  setup() {
    const store = useStore()
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const signInLoading = ref(false)
    const errorMessage = ref('')
    const signInDisabled = computed(() => {
      return (
        !(username.value.length > 0 && password.value.length > 0) ||
        signInLoading.value
      )
    })
    const signIn = async () => {
      try {
        console.log("password", password.value)
        signInLoading.value = true
        errorMessage.value = ''
        let formData = new FormData();
        formData.append('username', username.value);
        formData.append('password', password.value);
        await store.dispatch('auth/signIn', formData)
        signInLoading.value = false

        const returnUrl = router.currentRoute.value
        console.log("const returnUrl = router.currentRoute.value", router.currentRoute.value)
        router.push("/dashboard")
      } catch (err) {
        console.error(err)
        errorMessage.value = err?.message || err
        signInLoading.value = false
      }
    }

    return {
      signInDisabled,
      username,
      password,
      signInLoading,
      errorMessage,
      signIn,
    }
  },
}
</script>
