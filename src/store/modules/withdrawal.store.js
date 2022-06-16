import { getWithdrawalLists, confirmWithdrawal } from "@/api/withdrawal.api";
export default {
    state: {
        withdrawals: [],
    },
    getters: {
        getWithdrawalList(state) {
            return state.withdrawals;
        },
    },

    mutations: {
        setWithdrawalList(state, payload) {
            state.withdrawals = payload;
        },

        confirmWithdrawal(state, payload) {
            state.withdrawals.forEach((item) => {
                if (item._id === payload._id) {
                    item.is_confirmed = payload.is_confirmed;
                }
            });
        },
    },

    actions: {
        async fetchWithdrawalList({ commit }) {
            const response = await getWithdrawalLists({});
            commit("setWithdrawalList", response.data);
        },

        async confirmWithdrawal({ commit }, application) {
            const confirmation = 1 * !application.is_confirmed;
            const response = await confirmWithdrawal(
                application._id,
                confirmation
            );
            commit("confirmWithdrawal", response.data);
        },
    },
};
