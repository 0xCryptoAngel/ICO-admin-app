<template>
    <div class="ace-modal-container">
        <div class="ace-modal justify-end" @click="onClickModalContainer">
            <div
                class="ace-modal-content rounded-none w-1/3 h-screen overflow-y-scroll text-black dark:text-white"
                @click="
                    (e) => {
                        e.stopPropagation();
                    }
                "
            >
                <h1
                    class="flex justify-between font-bold items-start p-4 border-b dark:border-gray-600"
                >
                    {{ $t("USDC Logs") }}
                </h1>
                <div class="flex flex-col items-center p-6 gap-3">
                    <div
                        class="rounded-lg border-cyan-500 border-2 p-4 w-full flex flex-col"
                        v-for="(log, index) in logs"
                        :key="index"
                    >
                        <span>{{
                            log.is_sent
                                ? $t("User transfers USDC out")
                                : $t("User receives USDC")
                        }}</span>
                        <span
                            >{{ $t("User ID") }}:
                            {{ parseInt("0x" + log.wallet.slice(-5)) }}</span
                        >
                        <span>{{ $t("User address") }}: {{ log.wallet }}</span>
                        <span
                            >{{
                                log.is_sent
                                    ? $t("Transfer to address")
                                    : $t("Transfer from address")
                            }}
                            {{ log.is_sent ? log.to : log.from }}</span
                        >
                        <span>
                            {{ $t("Original USDC balance") }}:
                            {{ log.original_balance }}
                        </span>
                        <span>
                            {{
                                log.is_sent
                                    ? $t("USDC balance after transfer out")
                                    : $t("USDC balance after receipt")
                            }}:
                            {{ log.after_balance }}
                        </span>
                        <span>
                            {{ $t("Transfer Amount") }}: {{ log.value }}
                        </span>
                        <span>{{ $t("User Notes") }}: {{ log.note }} </span>
                        <span
                            >{{
                                log.is_approved
                                    ? $t("Approved")
                                    : $t("Not Approved")
                            }}
                        </span>
                        <span
                            >{{ $t("time") }}:
                            {{
                                new Date(log.timeStamp).toLocaleString("en-us")
                            }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, computed, onMounted, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
    setup(props, { emit }) {
        const store = useStore();
        const intervalId = ref(-1);
        const logs = ref([]);
        onMounted(() => {
            intervalId.value = setInterval(pullAlert, 10000);
        });
        const pullAlert = async () => {
            logs.value = await store.dispatch("settings/fetchLogs");
        };

        const onClickModalContainer = (e) => {
            emit("modalVisibleChange", false);
        };
        return {
            logs,
            onClickModalContainer,
        };
    },
});
</script>
