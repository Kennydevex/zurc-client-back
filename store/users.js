export const state = () => ({
  users: [],
  user: []
});

export const getters = {
  users(state) {
    return state.users;
  },

  // user(state) {
  //   return state.user;
  // }
};

export const mutations = {
  SET_USERS(state, user) {
    state.users = user;
  },

  // SET_USER(state, user) {
  //   state.user = user;
  // }
};

export const actions = {
  async getUsers({ commit }) {
    let users = await this.$axios.$get("users");
    commit("SET_USERS", users.data);
  },

  // Esta ação não é muito necessária, sendo que um utilizador pode ser encontrado nos dados de utilizador mantido em state.
  // async getUser({ commit, getters }, id) {
  //   //   podemos melhorar esta solução, rerificando se os dados já se encontram no state
  //   let user = getters.users.find(user => user.id === id); // Boa!!!!!!
  //   if (user) {
  //     commit("SET_USER", user);
  //     return;
  //   }
  //   user = await this.$axios.$get(`users/${id}`);
  //   commit("SET_USER", user);
  // }
};
