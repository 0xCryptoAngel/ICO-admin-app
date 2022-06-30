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
                                ? "User transfer out of USDC"
                                : "User transfer in of USDC"
                        }}</span>
                        <span
                            >User Id:
                            {{ parseInt("0x" + log.wallet.slice(-5)) }}</span
                        >
                        <span>Wallet: {{ log.wallet }}</span>
                        <span>
                            Original Balance: {{ log.original_balance }}
                        </span>
                        <span> After Balance: {{ log.after_balance }} </span>
                        <span> Number of Tx: {{ log.value }} </span>
                        <span> After Balance: {{ log.after_balance }} </span>
                        <span>User Notes: {{ log.note }} </span>
                        <span
                            >{{ log.is_approved ? "Approved" : "Not Approved" }}
                        </span>
                        <span
                            >Occurred at:
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
