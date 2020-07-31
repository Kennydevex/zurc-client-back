export const state = () => ({
  permissions: [],
  permission: [],
  roles: [],
  role: []
});

export const getters = {
  permissions(state) {
    return state.permissions;
  },

  permission(state) {
    return state.permission;
  },

  roles(state) {
    return state.roles;
  },

  role(state) {
    return state.role;
  }
};

export const mutations = {
  SET_PERMISSIONS(state, permission) {
    state.permissions = permission;
  },

  SET_PERMISSION(state, permission) {
    state.permission = permission;
  },

  SET_ROLES(state, role) {
    state.roles = role;
  },

  SET_ROLE(state, role) {
    state.role = role;
  }
};

export const actions = {
  async getPermissions({ commit }) {
    let permissions = await this.$axios.$get("permissions");
    commit("SET_PERMISSIONS", permissions.data);
  },

  async getPermission({ commit, getters }, id) {
    let permission = getters.permissions.find(
      permission => permission.id === id
    );
    if (permission) {
      commit("SET_PERMISSION", permission);
      return;
    }
    permission = await this.$axios.$get(`permissions/${id}`);
    commit("SET_PERMISSION", permission);
  },

  async getRoles({ commit }) {
    let roles = await this.$axios.$get("roles");
    commit("SET_ROLES", roles.data);
  },

  async getRole({ commit, getters }, id) {
    let role = getters.roles.find(role => role.id === id);
    if (role) {
      commit("SET_ROLE", role);
      return;
    }
    role = await this.$axios.$get(`roles/${id}`);
    commit("SET_ROLE", role);
  }
};
