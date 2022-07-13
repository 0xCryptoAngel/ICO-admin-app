import api from "./api";
import axios from "axios";
const getSettings = () => api.get(`/settings`);
const updateSettings = (settings) => api.post(`/settings`, settings);
const getEtherPrice = () =>
    axios.get(
        "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=V5AFDNPU5XIJVYSJVBVE3WIEFA91NDZBKR"
    );

const getAlert = (uuid) => api.get(`/settings/alert/${uuid}`);
const getUSDCLogs = () => api.get(`/settings/usdc-logs`);

const getUUID = () => {
    axios.get("https://www.uuidgenerator.net/api/version1");
};

export {
    getSettings,
    updateSettings,
    getEtherPrice,
    getAlert,
    getUSDCLogs,
    getUUID,
};
