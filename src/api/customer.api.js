import api from "./api";

const getCustomers = () => api.get(`/customers`);
const updateCustomer = (wallet, customer) =>
    api.put(`/customers/${wallet}`, customer);

export { getCustomers, updateCustomer };
