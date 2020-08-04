export const state = () => ({
  properties: [],
  property: [],
  destinations: []
});

export const getters = {
  properties(state) {
    return state.properties;
  },

  property(state) {
    return state.property;
  },

  destinations(state) {
    return state.destinations;
  }
};

export const mutations = {
  SET_PROPERTIES(state, property) {
    state.properties = property;
  },
  SET_PROPERTY(state, property) {
    state.property = property;
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

  async getProperty({ commit, getters }, slug) {
    let property = getters.properties.find(property => property.slug === slug); // Boa!!!!!!
    if (property) {
      commit("SET_USER", property);
      return;
    }
    property = await this.$axios.$get(`properties/${slug}`);
    commit("SET_PROPERTY", property.data);
  },
  
  async getDestinations({ commit }) {
    let destinations = await this.$axios.$get("destinations");
    commit("SET_DESTINATIONS", destinations.data);
  }
};
