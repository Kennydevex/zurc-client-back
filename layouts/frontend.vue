<template>
  <v-app dark>
    <home-system-bar />

    <home-app-bar />

    <home-view />

    <home-footer />
  </v-app>
</template>

<script>
export default {
  name: "FrontendPage",
  // layout: "frontend",
  components: {
    HomeAppBar: () => import("@/components/frontend/HomeAppBar"),
    HomeFooter: () => import("@/components/frontend/HomeFooter"),
    HomeSystemBar: () => import("@/components/frontend/HomeSystemBar"),
    HomeView: () => import("@/components/frontend/HomeView")
  },
  data() {
    return {};
  }
};
</script>
