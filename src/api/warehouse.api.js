import api from "./api";

const getHousesList = (page) => api.get(`/special/my/domains?page=${page}&page_size=${5}`)

const createWareHouses = (payload) => api.post('/special/create/warehouse', payload)
const editWareHouses = (payload) => api.patch(`/warehouse/${payload.id}`, payload.payload)
export { getHousesList, createWareHouses, editWareHouses }

