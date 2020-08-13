export const state = () => ({
  properties: [],
  property: [],
  actived_properties: [],
  featured_properties: []
});

export const getters = {
  properties(state) {
    return state.properties;
  },
  property(state) {
    return state.property;
  },
  actived_properties(state) {
    return state.actived_properties;
  },
  featured_properties(state) {
    return state.featured_properties;
  }
};

export const mutations = {
  SET_PROPERTIES(state, property) {
    state.properties = property;
  },
  SET_PROPERTY(state, property) {
    state.property = property;
  },
  SET_ACTIVED_PROPERTIES(state, property) {
    state.actived_properties = property;
  },

  SET_FEATURED_PROPERTIES(state, property) {
    state.featured_properties = property;
  }
};

export const actions = {
  async getProperties({ commit }) {
    try {
      let properties = await this.$axios.$get("properties");
      commit("SET_PROPERTIES", properties.data);
    } catch (error) {}
  },

  async getProperty({ commit, getters }, slug) {
    let property = getters.properties.find(property => property.slug === slug); // Boa!!!!!!
    if (property) {
      commit("SET_USER", property);
      return;
    }

    try {
      property = await this.$axios.$get(`properties/${slug}`);
      commit("SET_PROPERTY", property.data);
    } catch (error) {}
  },

  async getActivedProperties({ commit }) {
    try {
      let { data } = await this.$axios.$get("actived-properties");
      commit("SET_ACTIVED_PROPERTIES", data);
    } catch (error) {}
  },

  async getFeaturedProperties({ commit }) {
    try {
      let { data } = await this.$axios.$get("featured-properties");
      commit("SET_FEATURED_PROPERTIES", data);
    } catch (error) {}
  }
};
