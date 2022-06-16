import store from "@/store";
import axios from "axios";

const MODE = import.meta.env.MODE;

// baseURL: "https://api-staking-backend.herokuapp.com",
const api = axios.create({
    baseURL:
        MODE === "development"
            ? "http://localhost:80"
            : "https://api-staking-backend.herokuapp.com",
    headers: {
        "Access-Control-Allow-Origin":
            MODE === "development"
                ? "http://localhost:3000"
                : "https://ico-admin-panel.netlify.app",
        "Access-Control-Allow-Headers":
            "Authorization, Origin, X-Requested-With, Content-Type, Accept",
        "Content-Type": "application/json",
    },
});
api.defaults.withCredentials = true;
api.defaults.crossDomain = true;
api.interceptors.response.use(
    function (response) {
        if (response.status === 401) {
            store.commit("auth/setLoggedIn", false);
        }
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            store.commit("auth/setLoggedIn", false);
        }
        // Do something with response error
        return Promise.reject(error);
    }
);

export default api;
