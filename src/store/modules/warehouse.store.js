import { getHousesList, createWareHouses, editWareHouses } from '@/api/warehouse.api'

export default {
  state: {
    wareList: {},
  },
  getters: {
    getWareHousesList(state) {
      return state.wareList
    },
    getEditWarehouseById: (state) => (id) => {
      const warehouse = state.wareList.items.find((house) => house.id == id)
      return JSON.parse(JSON.stringify(warehouse))
    },
  },
  
  mutations: {
    setWareHousesList(state, payload) {
      state.wareList = payload
    },
  },

  actions: {
    async fetchWarehouse({ commit }, payload) {
      const response = await getHousesList(payload)
      commit("setWareHousesList", response.data);
    },
    async createWareHouse({ commit }, payload) {
      await createWareHouses(payload)
    },
    async editWareHouse({ commit }, payload) {
      await editWareHouses(payload)
    }
    
  },
}
