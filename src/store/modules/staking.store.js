import {
    getStakingApplications,
    getStakingOptions,
    updateStakingOption,
    confirmApplication,
    cancelApplication,
} from "@/api/staking.api";

export default {
    state: {
        applications: [],
        options: [],
    },
    getters: {
        getStakingApplications(state) {
            return state.applications
                .map((item) => {
                    const option = state.options.filter(
                        (option) => option._id == item.staking_option
                    )[0];
                    return {
                        ...item,
                        option: option
                            ? `$${option.startAmount}~${option.endAmount}`
                            : "",
                    };
                })
                .sort(
                    (b, a) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                );
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
        updateStakingOption(state, payload) {
            state.options.forEach((item, index) => {
                if (item._id === payload._id) {
                    state.options[index] = payload.option;
                }
            });
        },

        confirmApplication(state, payload) {
            state.applications.forEach((item) => {
                if (item._id === payload._id) {
                    item.is_confirmed = payload.is_confirmed;
                }
            });
        },
        cancelApplication(state, applicationId) {
            state.applications.forEach((item, index) => {
                if (item._id === applicationId) {
                    state.applications.splice(index, 1);
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

        async cancelApplication({ commit }, application) {
            const response = await cancelApplication(application._id);
            commit("cancelApplication", application._id);
        },
        async updateStakingOption({ commit }, option) {
            const response = await updateStakingOption(option._id, option);
            commit("updateStakingOption", {
                _id: option._id,
                option: response.data,
            });
        },
    },
};
