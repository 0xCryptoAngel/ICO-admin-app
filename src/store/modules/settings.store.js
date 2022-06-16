import { getSettings, updateSettings } from "@/api/settings.api";
export default {
    state: {
        settings: {},
    },
    getters: {
        getSettings(state) {
            return state.settings;
        },
    },

    mutations: {
        setSettings(state, payload) {
            state.settings = payload;
        },
    },

    actions: {
        async fetchSettings({ commit }) {
            const response = await getSettings();
            commit("setSettings", response.data);
        },

        async updateSettings({ commit }, settings) {
            const response = await updateSettings(settings);
            commit("setSettings", response.data);
        },
    },
};