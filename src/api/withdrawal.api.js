import api from "./api";

const getWithdrawals = "/withdrawals";

const getWithdrawalLists = async (payload) =>
  await api.get(getWithdrawals, payload);

export { getWithdrawalLists };
