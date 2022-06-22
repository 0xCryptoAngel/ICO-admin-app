import api from "./api";
import axios from "axios";
const getSettings = () => api.get(`/settings`);
const updateSettings = (settings) => api.post(`/settings`, settings);
const getEtherPrice = () =>
    axios.get(
        "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=V5AFDNPU5XIJVYSJVBVE3WIEFA91NDZBKR"
    );
export { getSettings, updateSettings, getEtherPrice };
