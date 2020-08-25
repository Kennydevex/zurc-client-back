<template>
  <v-app dark>
    <template v-if="spinLoad">
      <Spinner />
    </template>
    <template v-else>
      <home-system-bar />

      <home-app-bar />

      <home-view />

      <home-footer />
    </template>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FrontendLayout",

  // So para teste, aqui serão carregadas as propriedades ativadaas
  async created() {
    this.spinLoad = true;
    await this.$store.dispatch("companies/getCompanies");
    await this.$store.dispatch("services/getServices");
    await this.$store.dispatch("properties/getFeaturedProperties");
    this.spinLoad = false;
  },

  components: {
    HomeSystemBar: () => import("@/components/frontend/HomeSystemBar"),
    HomeAppBar: () => import("@/components/frontend/HomeAppBar"),
    HomeView: () => import("@/components/frontend/HomeView"),
    HomeFooter: () => import("@/components/frontend/HomeFooter"),
    Spinner: () => import("@/components/common/Spinner")
  },

  data() {
    return { spinLoad: false };
  }
};
</script>
