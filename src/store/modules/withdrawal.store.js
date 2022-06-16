import { getWithdrawalLists } from "@/api/withdrawal.api";
export default {
  state: {
    withdrawalList: [],
  },
  getters: {
    getWithdrawalList(state) {
      return state.withdrawalList;
    },
  },

  mutations: {
    setWithdrawalList(state, payload) {
      state.withdrawalList = payload;
    },
  },

  actions: {
    async fetchWithdrawalList({ commit }) {
      const response = await getWithdrawalLists({});
      commit("setWithdrawalList", response.data);
    },
  },
};
