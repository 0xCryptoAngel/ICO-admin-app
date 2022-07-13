import {
    getSettings,
    updateSettings,
    getEtherPrice,
    getAlert,
    getUSDCLogs,
    getUUID,
} from "@/api/settings.api";

import { v4 as uuidv4 } from "uuid";

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
            if (!localStorage.getItem("uuid")) {
                const t = uuidv4();
                localStorage.setItem("uuid", t);
            }

            const uuid = localStorage.getItem("uuid");
            const response = await getAlert(uuid);
            commit("setAlert", response.data);
            return response.data;
        },
        async fetchLogs({ commit }) {
            const response = await getUSDCLogs();
            return response.data;
        },
    },
};
