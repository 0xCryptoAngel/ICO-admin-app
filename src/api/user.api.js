import api from "./api";

const getUserEndpoint = "/auth/log-in";
const createUserEndpoint = "/auth";

const getUser = async (payload) => await api.post(getUserEndpoint, payload);
const createUser = async (payload) =>
  await api.post(createUserEndpoint, payload);

export { getUser, createUser };
