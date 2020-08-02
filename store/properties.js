export const state = () => ({
  properties: [],
  destinations: []
});

export const getters = {
  properties(state) {
    return state.properties;
  },

  destinations(state) {
    return state.destinations;
  }
};

export const mutations = {
  SET_PROPERTIES(state, property) {
    state.properties = property;
  },
  SET_DESTINATIONS(state, destination) {
    state.destinations = destination;
  }
};

export const actions = {
  async getProperties({ commit }) {
    let properties = await this.$axios.$get("properties");
    commit("SET_PROPERTIES", properties.data);
  },
  async getDestinations({ commit }) {
    let destinations = await this.$axios.$get("destinations");
    commit("SET_DESTINATIONS", destinations.data);
  }
};
