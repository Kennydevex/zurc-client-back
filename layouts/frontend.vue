<template>
  <v-app dark>
    <home-system-bar />

    <home-app-bar />

    <home-view />

    <home-footer />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex"; 

export default {
  name: "FrontendLayout",

  // So para teste, aqui serão carregadas as propriedades ativadaas
  async created() {
    await this.$store.dispatch("companies/getCompanies");
    await this.$store.dispatch("services/getServices");
  },

  components: {
    HomeSystemBar: () => import("@/components/frontend/HomeSystemBar"),
    HomeAppBar: () => import("@/components/frontend/HomeAppBar"),
    HomeView: () => import("@/components/frontend/HomeView"),
    HomeFooter: () => import("@/components/frontend/HomeFooter")
  },
  
  data() {
    return {};
  }
};
</script>
