export const state = () => ({
  drawer: true,
  miniVariant: false,
  clipped: false
});

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  drawer(state, val) {
    state.drawer = val;
  },
  toggleMiniVariant(state) {
    state.miniVariant = !state.miniVariant;
  },
  miniVariant(state, val) {
    state.miniVariant = val;
  },
  toggleClipped(state) {
    state.clipped = !state.clipped;
  },
  clipped(state, val) {
    state.clipped = val;
  }
};
