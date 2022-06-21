import api from "./api";

const getCustomers = () => api.get(`/customers`);
const createCustomer = (customer) => api.post(`/customers`, customer);
const updateCustomer = (wallet, customer) =>
    api.put(`/customers/${wallet}`, customer);

export { getCustomers, updateCustomer, createCustomer };
