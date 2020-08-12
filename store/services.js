export const state = () => ({
  services: [],
  service: [],
  create_service_dialog: false,
  update_service_dialog: false,
  list_service_dialog: false
});

export const getters = {
  services(state) {
    return state.services;
  }
};

export const mutations = {
  SET_SERVICES(state, service) {
    state.services = service;
  },

  CLEAN_SERVICES(state, service) {
    state.services = service;
  },

  toggleCreateServiceDialog(state) {
    state.create_service_dialog = !state.create_service_dialog;
  },
  create_service_dialog(state, val) {
    state.create_service_dialog = val;
  },
  toggleUpdateServiceDialog(state) {
    state.update_service_dialog = !state.update_service_dialog;
  },
  update_service_dialog(state, val) {
    state.update_service_dialog = val;
  },

  toggleListServiceDialog(state) {
    state.list_service_dialog = !state.list_service_dialog;
  },

  list_service_dialog(state, val) {
    state.list_service_dialog = val;
  }
};

export const actions = {
  cleanServicesData() {
    commit("CLEAN_SERVICES", {});
  },
  async getServices({ commit }) {
    try {
      let services = await this.$axios.$get("services");
      commit("SET_SERVICES", services.data);
    } catch (error) {}
  }
};
