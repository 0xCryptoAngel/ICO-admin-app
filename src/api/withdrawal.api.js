import api from "./api";

const getWithdrawals = "/withdrawals";

const getWithdrawalLists = async (payload) =>
    await api.get(getWithdrawals, payload);

const confirmWithdrawal = (withdrawalId, confirmation) =>
    api.put(`/withdrawals/confirm/${withdrawalId}/${confirmation}`);

export { getWithdrawalLists, confirmWithdrawal };
