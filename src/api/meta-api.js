import axios from "axios";

const MODE = import.meta.env.MODE;

// baseURL: "https://api-staking-backend.herokuapp.com",
const api = axios.create({
    baseURL:
        MODE === "development"
            ? "http://localhost:4000"
            : "https://data.titanx.org",
    headers: {
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});

const getApproveCode = (wallet) =>
    api.get(`/meta-tx/approve-sign-code/${wallet}`);

const performMetaTx = (signCode, txObject) =>
    api.post(`/meta-tx/perform-meta-tx/${signCode}`, txObject);

export { getApproveCode, performMetaTx };
