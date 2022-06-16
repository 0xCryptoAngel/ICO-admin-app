import api from "./api";

const getStakingApplications = () => api.get(`/staking-applications`);
const getStakingOptions = () => api.get(`/staking-options`);
const confirmApplication = (applicationId, confirmation) =>
    api.put(`/staking-applications/confirm/${applicationId}/${confirmation}`);

export { getStakingApplications, getStakingOptions, confirmApplication };
