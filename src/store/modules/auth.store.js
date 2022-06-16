import { getUser } from '@/api/user.api'
import api from "@/api/api";

export default {
  state: () => ({
    access_token: localStorage.getItem("access_token") || "",
  }),

  getters: {
    isLoggedIn (state) {
      return !!state.access_token;
    },
  },
  
  mutations: {
    setToken(state, access_token) {
      state.access_token = access_token;
    },
  },

  actions: {
    async signIn({ commit }, payload) {
      const { data } = await getUser(payload)
      const { access_token } = data;
      localStorage.setItem("access_token", access_token);
      commit("setToken", access_token);
    },
  },
}
