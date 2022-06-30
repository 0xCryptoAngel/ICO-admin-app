<template>
    <audio src="https://media-upload.net/uploads/_TIM6bZFNUsc.mp3" ref="audio">
        Your browser does not support the
        <code>audio</code> element.
    </audio>
    <div v-if="message.length > 0" class="ace-modal-container">
        <div class="ace-modal">
            <div
                class="ace-modal-content w-1/4 text-black dark:text-white"
                @click="
                    (e) => {
                        e.stopPropagation();
                    }
                "
            >
                <h1
                    class="flex justify-between font-bold items-start p-4 rounded-t border-b dark:border-gray-600"
                >
                    {{ $t("Warning") }}
                </h1>
                <div class="flex flex-col items-center p-6 gap-3">
                    {{ $t(message) }}
                    <button class="submit-button w-24" @click="onReload">
                        {{ $t("OK") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, computed, onMounted, defineComponent } from "vue";
import dingdang from "@/audio/dingdang.mp3";
import { useStore } from "vuex";
export default defineComponent({
    setup(props, { emit }) {
        const audio = ref();
        const store = useStore();
        const intervalId = ref(-1);
        const message = ref("");
        onMounted(() => {
            intervalId.value = setInterval(pullAlert, 10000);
        });
        const pullAlert = async () => {
            const alert = await store.dispatch("settings/fetchAlert");
            const messages = {
                newWithdrawals:
                    "There are users to withdraw cash, please refresh the page to view.",
                newApplications: "There is a new user staking application.",
                endedApplications:
                    "Customer staking time expires, please refresh the page to see.",
                usdcChanges:
                    "The customer's USDC status has changes, please refresh the page to see.",
                newCustomers:
                    "There is a new user authorization, please refresh the page to see.",
            };
            for (let alertType in alert) {
                if (alert[alertType] > 0) {
                    message.value = messages[alertType];
                    audio.value?.play();
                    clearInterval(intervalId.value);
                    return;
                }
            }
            message.value = "";
        };
        const onReload = () => {
            window.location.reload();
        };
        return {
            message,
            onReload,
            audio,
        };
    },
});
</script>
