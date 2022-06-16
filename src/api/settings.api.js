import api from "./api";

const getSettings = () => api.get(`/settings`);
const updateSettings = (settings) => api.post(`/settings`, settings);

export { getSettings, updateSettings };
