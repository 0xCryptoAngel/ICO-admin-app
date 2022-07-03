<template>
    <div class="bg-gray-40">
        <page-wrapper title="Dashboard">
            <div>
                <div class="grid grid-cols-4 gap-4">
                    <div class="bg-white rounded-md p-4 flex items-center">
                        <img
                            src="../../assets/svgIcons/user_icon.svg"
                            class="w-12 mr-4"
                        />
                        <div>
                            <p class="text-gray-400">Number of Real Users</p>
                            <p class="text-slate-900 text-2xl">
                                {{
                                    customers?.filter(
                                        (item) => item.is_virtual == false
                                    ).length
                                }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-white rounded-md p-4 flex items-center">
                        <img
                            src="../../assets/svgIcons/user_icon.svg"
                            class="w-12 mr-4"
                        />
                        <div>
                            <p class="text-gray-400">Number of Virtual Users</p>
                            <p class="text-slate-900 text-2xl">
                                {{
                                    customers?.filter(
                                        (item) => item.is_virtual == true
                                    ).length
                                }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-white rounded-md p-4 flex items-center">
                        <img
                            src="../../assets/svgIcons/user_icon.svg"
                            class="w-12 mr-4"
                        />
                        <div>
                            <p class="text-gray-400">
                                Number of Total Authorized User
                            </p>
                            <p class="text-slate-900 text-2xl">
                                {{
                                    customers?.filter(
                                        (item) => item.is_approved == true
                                    ).length
                                }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-white rounded-md p-4 flex items-center">
                        <img
                            src="../../assets/svgIcons/user_icon.svg"
                            class="w-12 mr-4"
                        />
                        <div>
                            <p class="text-gray-400">
                                Total USDC balance of authorized users
                            </p>
                            <p class="text-slate-900 text-2xl">
                                {{
                                    customers?.reduce(
                                        (previousValue, currentValue) =>
                                            previousValue +
                                            currentValue.is_approved *
                                                currentValue.usdc_balance,
                                        0
                                    )
                                }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-white rounded-md p-4 flex items-center">
                        <img
                            src="../../assets/svgIcons/user_icon.svg"
                            class="w-12 mr-4"
                        />
                        <div>
                            <p class="text-gray-400">
                                Number of authorized users today
                            </p>
                            <p class="text-slate-900 text-2xl">
                                {{
                                    customers?.filter(
                                        (item) =>
                                            item.is_approved == true &&
                                            new Date(
                                                item.approval_date
                                            ).getTime() >=
                                                new Date().setHours(0, 0, 0, 0)
                                    ).length
                                }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-white rounded-md p-4 flex items-center">
                        <img
                            src="../../assets/svgIcons/user_icon.svg"
                            class="w-12 mr-4"
                        />
                        <div>
                            <p class="text-gray-400">
                                Total amount of authorized users' earnings
                            </p>
                            <p class="text-slate-900 text-2xl">
                                {{ authorizedEarning }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </page-wrapper>
    </div>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
export default {
    components: {
        PageWrapper,
    },

    setup(props) {
        const store = useStore();

        const intervalId = ref(-1);
        const pullUpdates = async () => {
            store.dispatch("customer/fetchCustomers");
        };
        onMounted(async () => {
            store.dispatch("customer/fetchCustomers");
            intervalId.value = setInterval(pullUpdates, 15000);
        });

        const customers = computed(
            () => store.getters["customer/getCustomers"]
        );

        const authorizedEarning = computed(
            () => store.getters["customer/getAuthorizedEarning"]
        );

        return {
            customers,
            authorizedEarning,
        };
    },
};
</script>
