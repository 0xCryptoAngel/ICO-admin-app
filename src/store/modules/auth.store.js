import { getUser, createUser } from "@/api/user.api";
import api from "@/api/api";

export default {
    state: () => ({
        loggedIn: false,
    }),

    getters: {
        isLoggedIn(state) {
            return state.loggedIn || !!localStorage.getItem("loggedIn");
        },
    },

    mutations: {
        setLoggedIn(state, _loggedIn) {
            state.loggedIn = _loggedIn;
            if (_loggedIn) localStorage.setItem("loggedIn", 1);
            else localStorage.removeItem("loggedIn");
        },
    },

    actions: {
        async signIn({ commit }, payload) {
            const res = await getUser(payload);
            if (res.status === 200) {
                commit("setLoggedIn", true);
            } else commit("setLoggedIn", false);
        },
        async signUp({ commit }, payload) {
            const res = await createUser(payload);
            if (res.status === 200) commit("setLoggedIn", true);
            else commit("setLoggedIn", false);
        },
    },
};
