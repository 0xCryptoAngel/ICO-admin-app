import { getUser, createUser } from "@/api/user.api";

import router from "@/router/router";

export default {
    state: () => ({
        loggedIn: 0,
        role: 1,
    }),

    getters: {
        isLoggedIn(state) {
            return {
                isLoggedIn:
                    state.loggedIn || !!localStorage.getItem("loggedIn"),
                role: state.role,
            };
        },
    },

    mutations: {
        setLoggedIn(state, { _loggedIn, role }) {
            state.loggedIn = _loggedIn;
            if (_loggedIn) {
                localStorage.setItem("loggedIn", 1);
                localStorage.setItem("role", role);
            } else {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("role");
                router.push("/login");
            }
        },
    },

    actions: {
        async signIn({ commit }, payload) {
            const res = await getUser(payload);
            if (res.status === 200) {
                commit("setLoggedIn", { _loggedIn: true, role: res.data.role });
            } else commit("setLoggedIn", { _loggedIn: false });
        },
        async signUp({ commit }, payload) {
            const res = await createUser(payload);
            if (res.status === 200)
                commit("setLoggedIn", { _loggedIn: true, role: res.data.role });
            else commit("setLoggedIn", { _loggedIn: false });
        },
    },
};
