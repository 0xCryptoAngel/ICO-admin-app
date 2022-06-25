<template>
    <div class="ace-modal-container">
        <div class="ace-modal">
            <div class="ace-modal-content w-80 text-white">
                <h1
                    class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
                >
                    {{ $t("USDC Transfer") }}
                </h1>
                <div class="flex flex-col p-6 gap-3">
                    <input class="w-full modal-input" value="0" />
                    <input
                        class="w-full modal-input"
                        placeholder="Enter user wallet address"
                    />
                    <input
                        class="w-full modal-input"
                        placeholder="Enter your wallet address"
                    />
                    <button class="submit-button">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {},
    setup() {},
};
</script>
