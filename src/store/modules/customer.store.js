import {
    getCustomers,
    updateCustomer,
    createCustomer,
} from "@/api/customer.api";

export default {
    state: {
        customers: [],
    },
    getters: {
        getAuthorizedEarning(state) {
            let result = 0;
            state.customers.forEach((customer) => {
                if (customer.is_approved) result += customer.staking_balance;
            });
            return result;
        },
        getCustomers(state) {
            console.log("state.customers", state.customers)
            return state.customers;
        },
    },

    mutations: {
        setCustomers(state, payload) {
            payload.forEach((customer) => {
                customer.invitation_object = [
                    {
                        number: 0,
                        list: [],
                    },
                    {
                        number: 0,
                        list: [],
                    },
                    {
                        number: 0,
                        list: [],
                    },
                ];
            });
            payload.forEach((customer) => {
                let curInvitor = customer.invitor;
                for (let i = 1; i < 4; i++) {
                    if (!curInvitor) break;
                    const invitor = payload.find(
                        (item) => item._id == curInvitor
                    );
                    if (invitor) {
                        invitor.invitation_object[i - 1].number++;
                        invitor.invitation_object[i - 1].list.push(
                            invitor.wallet
                        );
                        curInvitor = invitor.invitor;
                    } else {
                        break;
                    }
                }
            });
            state.customers = payload;
        },

        createCustomer(state, customer) {
            state.customers.push(customer);
        },
        setCustomer(state, payload) {
            state.customers.forEach((item) => {
                if (item._id === payload._id) {
                    for (const property in item) {
                        item[property] = payload[property];
                    }
                }
            });
        },
        confirmApplication(state, payload) {
            state.customers.forEach((item) => {
                if (item._id === payload._id) {
                    item.is_confirmed = payload.is_confirmed;
                }
            });
        },
    },

    actions: {
        async fetchCustomers({ commit }) {
            const response = await getCustomers();
            commit("setCustomers", response.data);
        },
        async updateCustomer({ commit }, { wallet, customer }) {
            const response = await updateCustomer(wallet, customer);
            commit("setCustomer", response.data);
        },
        async createCustomer({ commit }, customer) {
            const response = await createCustomer(customer);
            commit("createCustomer", response.data);
        },
    },
};
