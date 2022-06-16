import store from "@/store";
import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:80",
    // baseURL: "https://api-staking-backend.herokuapp.com",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});
api.defaults.withCredentials = true;

api.interceptors.response.use(
    function (response) {
        if (response.status === 401) {
            console.log("committt");
            store.commit("auth/setLoggedIn", false);
        }
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default api;
