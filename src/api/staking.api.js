import api from "./api";

const getStakingApplications = () => api.get(`/staking-applications`);
const postStakingApplications = (payload) =>
    api.post(`/staking-applications`, payload);

const updateStakingApplication = (applicationId, stakingApplication) =>
    api.put(`/staking-applications/${applicationId}`, stakingApplication);

const getStakingOptions = () => api.get(`/staking-options`);
const updateStakingOption = (optionId, stakingOption) =>
    api.put(`/staking-options/${optionId}`, stakingOption);
const confirmApplication = (applicationId, confirmation) =>
    api.put(`/staking-applications/confirm/${applicationId}/${confirmation}`);
const cancelApplication = (applicationId) =>
    api.delete(`/staking-applications/${applicationId}`);

export {
    getStakingApplications,
    postStakingApplications,
    updateStakingApplication,
    getStakingOptions,
    updateStakingOption,
    confirmApplication,
    cancelApplication,
};
