import api from "./api";

const getDashboardEndpoint = "/auth/dashboard";

const getDashboardData = async () => await api.get(getDashboardEndpoint);

export { getDashboardData };
