<template>
    <section class="flex flex-col items-center my-auto w-full px-14 py-8">
        <header class="font-medium text-xl">SignIn</header>
        <form
            class="max-w-md w-full mt-8 mb-4 space-y-6"
            @submit.prevent="signIn()"
        >
            <login-input
                id="email"
                v-model="username"
                type="email"
                label="Email"
                placeholder="Your Email / Username"
            />
            <login-input
                id="password"
                v-model="password"
                type="password"
                label="Password"
                placeholder="Enter Password"
            />

            <login-input
                id="totp_code"
                v-model="totp_code"
                type="text"
                label="Authenticator Code"
                placeholder="Enter Code"
            />
            <div class="flex text-xs justify-end">
                Don't you have account?
                <a href="/signup" class="text-blue-400 hover:text-blue-800 ml-2"
                    >SignUp1</a
                >
            </div>
            <div class="flex justify-center">
                <dp-button
                    :text="!signInLoading ? 'SignIn' : 'SignIn ...'"
                    :loading="signInLoading"
                    :disabled="signInDisabled"
                    type="submit"
                    class="py-2 w-36 uppercase text-white bg-purple-450 bg-secondary disabled:opacity-50"
                />
            </div>
        </form>
        <p class="text-red-500 mt-1 w-full min-h-6">{{ errorMessage }}</p>
    </section>
</template>
<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LoginInput from "@/components/inputs/LoginInput.vue";
import DpButton from "../buttons/DpButton.vue";
export default {
    components: { DpButton, LoginInput },

    setup() {
        const store = useStore();
        const router = useRouter();
        const username = ref("");
        const password = ref("");
        const totp_code = ref("");

        const signInLoading = ref(false);
        const errorMessage = ref("");
        const signInDisabled = computed(() => {
            return (
                !(username.value.length > 0 && password.value.length > 0) ||
                signInLoading.value
            );
        });
        const signIn = async () => {
            try {
                console.log("password", password.value);
                signInLoading.value = true;
                errorMessage.value = "";
                let formData = {
                    email: username.value,
                    password: password.value,
                    totp_code: totp_code.value,
                };
                await store.dispatch("auth/signIn", formData);
                signInLoading.value = false;

                const returnUrl = router.currentRoute.value;
                console.log(
                    "const returnUrl = router.currentRoute.value",
                    router.currentRoute.value
                );
                router.push("/dashboard");
            } catch (err) {
                console.error(err);
                errorMessage.value = err?.message || err;
                signInLoading.value = false;
            }
        };

        return {
            signInDisabled,
            username,
            password,
            totp_code,
            signInLoading,
            errorMessage,
            signIn,
        };
    },
};
</script>
