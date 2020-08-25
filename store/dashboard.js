export const state = () => ({
  messages: []
});

export const getters = {
  messages(state) {
    return state.messages;
  }
};

export const mutations = {
  SET_MESSAGES(state, message) {
    state.messages = message;
  }
};

export const actions = {
  async getGuestMessages({ commit }) {
    try {
      let { data } = await this.$axios.$get("get-messages");
      commit("SET_MESSAGES", data);
    } catch (error) {}
  }
};
