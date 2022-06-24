<template>
    <section class="flex items-center my-auto w-full px-14 py-8">
        <div class="w-80 flex flex-col" v-if="qr_uri">
            <img :src="qr_uri" />

            <button
                type="button"
                class="px-8 bg-cyan-700 button"
                v-if="qr_uri"
                @click="onBacktoLogin"
            >
                Back to Login
            </button>
        </div>
        <form
            class="flex flex-col items-center max-w-md w-full mt-8 mb-4 space-y-6"
            @submit.prevent="signIn()"
        >
            <header class="font-medium text-xl">Singup</header>
            <login-input
                id="name"
                v-model="username"
                type="text"
                label="UserName"
                placeholder="Your Username"
            />
            <login-input
                id="email"
                v-model="userEmail"
                type="email"
                label="Email"
                placeholder="Your Email"
            />
            <login-input
                id="password"
                v-model="password"
                type="password"
                label="Password"
                placeholder="Enter Password"
            />
            <div class="flex text-xs justify-end">
                Don you early have account?
                <a href="/login" class="text-blue-400 hover:text-blue-800 ml-2"
                    >SignIn</a
                >
            </div>
            <div class="flex justify-center">
                <dp-button
                    :text="!signUpLoading ? 'SignUp' : 'SignUp ...'"
                    :loading="signUpLoading"
                    :disabled="signUpDisabled"
                    type="submit"
                    class="py-2 w-36 uppercase text-white bg-purple-450 bg-secondary disabled:opacity-50"
                />
            </div>
            <p class="text-red-500 mt-1 w-full min-h-6">{{ errorMessage }}</p>
        </form>
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
        const qr_uri = computed(() => store.getters["auth/getQRCode"]);

        const store = useStore();
        const router = useRouter();
        const username = ref("");
        const userEmail = ref("");
        const password = ref("");

        const signUpLoading = ref(false);
        const errorMessage = ref("");
        const signUpDisabled = computed(() => {
            return (
                !(
                    username.value.length > 0 &&
                    password.value.length > 0 &&
                    userEmail.value.length > 0
                ) || signUpLoading.value
            );
        });
        const onBacktoLogin = () => {
            router.push("/login");
        };
        const signIn = async () => {
            try {
                signUpLoading.value = true;
                errorMessage.value = "";
                let formData = {
                    name: username.value,
                    email: userEmail.value,
                    password: password.value,
                };
                console.log("formData", formData);

                await store.dispatch("auth/signUp", formData);
                return;
                signUpLoading.value = false;

                const returnUrl = router.currentRoute.value;
                console.log(
                    "const returnUrl = router.currentRoute.value",
                    router.currentRoute.value
                );
                // router.push("/dashboard");
            } catch (err) {
                console.error(err);
                errorMessage.value = err?.message || err;
                signUpLoading.value = false;
            }
        };

        return {
            signUpDisabled,
            username,
            password,
            signUpLoading,
            errorMessage,
            userEmail,
            signIn,
            qr_uri,
            onBacktoLogin,
        };
    },
};
</script>
