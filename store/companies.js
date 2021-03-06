export const state = () => ({
  companies: [],
  company: []
});

export const getters = {
  companies(state) {
    return state.companies;
  },

  company(state) {
    return state.company;
  }
};

export const mutations = {
  SET_COMPANIES(state, company) {
    state.companies = company;
  },
  SET_COMPANY(state, company) {
    state.company = company;
  }
};

export const actions = {
  // async nuxtServerInit({ commit }, { req }) {
  //   try {
  //     let companies = await this.$axios.$get("companies");
  //     commit("SET_COMPANIES", companies.data);
  //   } catch (error) {}
  // },
  async getCompanies({ commit }) {
    try {
      let companies = await this.$axios.$get("companies");
      commit("SET_COMPANIES", companies.data);
    } catch (error) {}
  },

  async getCompany({ commit, getters }, slug) {
    let company = getters.companies.find(company => company.slug === slug);

    if (company) {
      commit("SET_USER", company);
      return;
    }

    try {
      company = await this.$axios.$get(`companies/${slug}`);
      commit("SET_COMPANY", company.data);
    } catch (error) {}
  }
};
