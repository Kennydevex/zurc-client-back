export const state = () => ({
  categories: [],
  category: [],
  create_category_dialog: false,
  update_category_dialog: false,
  list_category_dialog: false
});

export const getters = {
  categories(state) {
    return state.categories;
  }
};

export const mutations = {
  SET_CATEGORIES(state, category) {
    state.categories = category;
  },

  CLEAN_CATEGORIES(state, category) {
    state.categories = category;
  },

  toggleCreateCategoryDialog(state) {
    state.create_category_dialog = !state.create_category_dialog;
  },
  create_category_dialog(state, val) {
    state.create_category_dialog = val;
  },
  toggleUpdateCategoryDialog(state) {
    state.update_category_dialog = !state.update_category_dialog;
  },
  update_category_dialog(state, val) {
    state.update_category_dialog = val;
  },

  toggleListCategoryDialog(state) {
    state.list_category_dialog = !state.list_category_dialog;
  },

  list_category_dialog(state, val) {
    state.list_category_dialog = val;
  }
};

export const actions = {
  cleanCategoriesData() {
    commit("CLEAN_CATEGORIES", {});
  },
  async getCategories({ commit }) {
    try {
      let categories = await this.$axios.$get("categories");
      commit("SET_CATEGORIES", categories.data);
    } catch (error) {}
  }
};
