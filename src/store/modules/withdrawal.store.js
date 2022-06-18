import { getWithdrawalLists, confirmWithdrawal } from "@/api/withdrawal.api";
export default {
    state: {
        withdrawals: [],
    },
    getters: {
        getWithdrawalList(state) {
            return state.withdrawals
                .slice(0)
                .sort(
                    (b, a) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                );
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

        async confirmWithdrawal({ commit }, { withdrawal, is_confirmed }) {
            const response = await confirmWithdrawal(
                withdrawal._id,
                is_confirmed
            );
            commit("confirmWithdrawal", response.data);
        },
    },
};
