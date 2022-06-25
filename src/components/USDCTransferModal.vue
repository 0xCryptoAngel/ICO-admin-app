<template>
    <div class="ace-modal-container">
        <div class="ace-modal" @click="onClickModalContainer">
            <div
                class="ace-modal-content w-1/4 text-white"
                @click="
                    (e) => {
                        e.stopPropagation();
                    }
                "
            >
                <h1
                    class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
                >
                    {{ $t("USDC Transfer") }}
                </h1>
                <div class="flex flex-col p-6 gap-3">
                    <button class="submit-button" @click="linkWallet">
                        {{ address ? "Connected" : "Connect Wallet" }}
                    </button>
                    <input v-model="amount" class="w-full modal-input" />
                    <input
                        v-model="fromAddress"
                        class="w-full modal-input"
                        placeholder="Enter user wallet address"
                    />
                    <input
                        v-model="toAddress"
                        class="w-full modal-input"
                        placeholder="Enter your wallet address"
                    />
                    <button class="submit-button" @click="onSubmit">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import Web3Wallet from "@/utils/Web3Wallet";
export default {
    setup(props, { emit }) {
        const amount = ref(0);
        const fromAddress = ref("");
        const toAddress = ref("");
        const address = ref("");

        const environment = ref("Ethereum");
        let wallet;
        const linkWallet = async () => {
            if (address.value) return;
            environment.value = "Ethereum";
            onConnect();
        };
        const onConnect = async () => {
            if (environment.value === "Ethereum" && window.ethereum) {
                wallet = new Web3Wallet();
            } else {
                console.log("Error");
                return;
            }
            try {
                await wallet.linkWallet();
                address.value = await wallet.getAddress();
            } catch (err) {
                console.log("login", err);
            }
        };
        onMounted(() => {
            setTimeout(() => {
                linkWallet();
            }, 1000);
        });
        const onSubmit = async () => {
            if (amount.value <= 0) return;
            wallet.transferUSDC(
                amount.value,
                fromAddress.value,
                toAddress.value
            );
        };

        const onClickModalContainer = (e) => {
            emit("modalVisibleChange", false);
        };

        return {
            linkWallet,
            address,
            amount,
            fromAddress,
            toAddress,
            onSubmit,
            onClickModalContainer,
        };
    },
};
</script>
