import { getSettings, updateSettings, getEtherPrice } from "@/api/settings.api";
import { getAlert } from "../../api/settings.api";
export default {
    state: {
        settings: {},
        alert: {},
    },
    getters: {
        getSettings(state) {
            return state.settings;
        },
        getAlert(state) {
            return state.alert;
        },
    },

    mutations: {
        setSettings(state, payload) {
            state.settings = payload;
        },
        setAlert(state, payload) {
            state.alert = payload;
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
        async fetchEtherPrice({ commit }, settings) {
            const {
                data: {
                    result: { ethusd: ethusd },
                },
            } = await getEtherPrice();

            localStorage.setItem("ethusd", ethusd);
        },

        async fetchAlert({ commit }) {
            const response = await getAlert();
            commit("setAlert", response.data);
            return response.data;
        },
    },
};
