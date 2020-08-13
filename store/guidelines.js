export const state = () => ({
  guidelines: [],
  guideline: [],

  create_guideline_dialog: false,
  update_guideline_dialog: false,
  list_guideline_dialog: false
});

export const getters = {
  guidelines(state) {
    return state.guidelines;
  }
};

export const mutations = {
  SET_GUIDELINES(state, guideline) {
    state.guidelines = guideline;
  },

  toggleCreateGuidelineDialog(state) {
    state.create_guideline_dialog = !state.create_guideline_dialog;
  },
  create_guideline_dialog(state, val) {
    state.create_guideline_dialog = val;
  },

  toggleUpdateGuidelineDialog(state) {
    state.update_guideline_dialog = !state.update_guideline_dialog;
  },
  update_guideline_dialog(state, val) {
    state.update_guideline_dialog = val;
  },
  toggleListGuidelineDialog(state) {
    state.list_guideline_dialog = !state.list_guideline_dialog;
  },
  list_guideline_dialog(state, val) {
    state.list_guideline_dialog = val;
  }
};

export const actions = {
  async getGuidelines({ commit }) {
    try {
      let guidelines = await this.$axios.$get("guidelines");
      commit("SET_GUIDELINES", guidelines.data);
    } catch (error) {}
  }
};
