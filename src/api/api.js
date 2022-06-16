import axios from "axios";
const api = axios.create({
  baseURL: "http://3.17.119.111",
});
api.defaults.headers.common.Authorization = `bearer ${localStorage.getItem("access_token")}`;
export default api;
