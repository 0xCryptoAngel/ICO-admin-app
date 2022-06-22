import { getDashboardData } from "@/api/dashboard.api";

export default {
    state: () => ({
        dashboardData: {},
    }),

    getters: {
        getDashboardData(state) {
            return state.dashboardData;
        },
    },

    mutations: {
        setDashboardData(state, dashboardData) {
            state.dashboardData = dashboardData;
        },
    },

    actions: {
        async fetchDashboardData({ commit }, payload) {
            const res = await getDashboardData();
            commit("setDashboardData", res.data);
        },
    },
};
