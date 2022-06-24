import { getUser, createUser } from "@/api/user.api";

import router from "@/router/router";

export default {
    state: () => ({
        loggedIn: 0,
        role: 1,
        qr_uri: "",
    }),

    getters: {
        isLoggedIn(state) {
            return {
                isLoggedIn:
                    state.loggedIn || !!localStorage.getItem("loggedIn"),
                role: state.role,
            };
        },
        getQRCode(state) {
            return state.qr_uri;
        },
    },

    mutations: {
        setLoggedIn(state, { _loggedIn, role, prevent_redirect, qr_uri }) {
            state.loggedIn = _loggedIn;
            if (_loggedIn) {
                localStorage.setItem("loggedIn", 1);
                localStorage.setItem("role", role);
            } else {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("role");
                if (!prevent_redirect) router.push("/login");
            }
            if (qr_uri) state.qr_uri = qr_uri;
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
            if (res.status === 200 || res.status === 201)
                commit("setLoggedIn", {
                    _loggedIn: false,
                    prevent_redirect: true,
                    qr_uri: res.data.url,
                });
            else
                commit("setLoggedIn", {
                    _loggedIn: false,
                    prevent_redirect: true,
                    qr_uri: res.data.url,
                });
        },
    },
};
