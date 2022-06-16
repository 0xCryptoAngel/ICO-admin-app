import { getCustomers, updateCustomer } from "@/api/customer.api";

export default {
    state: {
        customers: [],
        options: [],
    },
    getters: {
        getCustomers(state) {
            return state.customers;
        },
    },

    mutations: {
        setCustomers(state, payload) {
            state.customers = payload;
        },
        setCustomer(state, payload) {
            console.log(payload);
            state.customers.filter((item) => item._id === payload._id)[0];
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
    },
};
