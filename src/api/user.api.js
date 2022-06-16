import api from "./api";

const getUserEndpoint = '/auth/jwt/login'

const getUser = async (payload) => await api.post(getUserEndpoint, payload)

export { getUser }

