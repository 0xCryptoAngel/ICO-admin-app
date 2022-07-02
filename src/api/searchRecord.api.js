import api from "./api";

const searchRecord = (recordType, query) =>
    api.get(`/settings/search/${recordType}/${query}`);

export { searchRecord };
