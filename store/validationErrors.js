export const state = () => ({
  backend_form_errors: {}
});

export const getters = {
  backend_form_errors(state) {
    return state.backend_form_errors;
  }
};

export const mutations = {
  SET_VALIDATION_ERRORS(state, backend_form_errors) {
    state.backend_form_errors = backend_form_errors;
  }
};

export const actions = {
  async setFormErrors({ commit }, backend_form_errors) {
    commit("SET_VALIDATION_ERRORS", backend_form_errors);
  },

  async clearFormErrors({ commit }) {
    commit("SET_VALIDATION_ERRORS", {});
  }
};
