import api from "./api";

const getStakingApplications = () => api.get(`/staking-applications`);
const postStakingApplications = (payload) =>
    api.post(`/staking-applications`, payload);

const updateStakingApplication = (applicationId, stakingApplication) =>
    api.put(`/staking-applications/${applicationId}`, stakingApplication);

const getStakingOptions = () => api.get(`/staking-options`);
const updateStakingOption = (optionId, stakingOption) =>
    api.put(`/staking-options/${optionId}`, stakingOption);
const confirmApplication = (applicationId, confirmation, deduct_method) =>
    api.put(
        `/staking-applications/confirm/${applicationId}/${confirmation}/${deduct_method}`
    );
const cancelApplication = (applicationId) =>
    api.put(`/staking-applications/cancel/${applicationId}`);

export {
    getStakingApplications,
    postStakingApplications,
    updateStakingApplication,
    getStakingOptions,
    updateStakingOption,
    confirmApplication,
    cancelApplication,
};
