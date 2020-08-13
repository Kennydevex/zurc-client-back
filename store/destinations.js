export const state = () => ({
  destinations: [],
  destination: [],
  create_destination_dialog: false,
  update_destination_dialog: false,
  list_destination_dialog: false
});

export const getters = {
  destinations(state) {
    return state.destinations;
  }
};

export const mutations = {
  SET_DESTINATIONS(state, destination) {
    state.destinations = destination;
  },

  CLEAN_DESTINATIONS(state, destination) {
    state.destinations = destination;
  },

  toggleCreateDestinationDialog(state) {
    state.create_destination_dialog = !state.create_destination_dialog;
  },
  create_destination_dialog(state, val) {
    state.create_destination_dialog = val;
  },
  toggleUpdateDestinationDialog(state) {
    state.update_destination_dialog = !state.update_destination_dialog;
  },
  update_destination_dialog(state, val) {
    state.update_destination_dialog = val;
  },

  toggleListDestinationDialog(state) {
    state.list_destination_dialog = !state.list_destination_dialog;
  },

  list_destination_dialog(state, val) {
    state.list_destination_dialog = val;
  }
};

export const actions = {
  cleanDestinationsData() {
    commit("CLEAN_DESTINATIONS", {});
  },
  async getDestinations({ commit }) {
    try {
      let destinations = await this.$axios.$get("destinations");
      commit("SET_DESTINATIONS", destinations.data);
    } catch (error) {}
  }
};
