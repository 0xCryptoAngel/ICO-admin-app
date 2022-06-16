import {
    getStakingApplications,
    getStakingOptions,
    confirmApplication,
} from "@/api/staking.api";

export default {
    state: {
        applications: [],
        options: [],
    },
    getters: {
        getStakingApplications(state) {
            return state.applications.map((item) => {
                const option = state.options.filter(
                    (option) => option._id == item.staking_option
                )[0];
                return {
                    ...item,
                    option: option
                        ? `$${option.startAmount}~${option.endAmount}`
                        : "",
                };
            });
        },
        getStakingOptions(state) {
            return state.options;
        },
    },

    mutations: {
        setStakingApplications(state, payload) {
            state.applications = payload;
        },
        setStakingOptions(state, payload) {
            state.options = payload;
        },
        confirmApplication(state, payload) {
            state.applications.forEach((item) => {
                if (item._id === payload._id) {
                    item.is_confirmed = payload.is_confirmed;
                }
            });
        },
    },

    actions: {
        async fetchStakingApplications({ commit }) {
            const response = await getStakingApplications();
            commit("setStakingApplications", response.data);
        },

        async fetchStakingInformations({ commit }) {
            const [applications, options] = await Promise.all([
                getStakingApplications(),
                getStakingOptions(),
            ]);
            commit("setStakingApplications", applications.data);
            commit("setStakingOptions", options.data);
        },

        async fetchStakingOptions({ commit }, payload) {
            const response = await getStakingOptions(payload);
            commit("setStakingOptions", response.data);
        },

        async confirmApplication({ commit }, application) {
            const confirmation = 1 * !application.is_confirmed;
            const response = await confirmApplication(
                application._id,
                confirmation
            );
            commit("confirmApplication", response.data);
        },
    },
};
