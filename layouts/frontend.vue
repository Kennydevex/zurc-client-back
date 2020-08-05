<template>
  <v-app dark>
    <home-system-bar />

    <home-app-bar />

    <home-view />

    <home-footer />
  </v-app>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "FrontendPage",
  // layout: "frontend",

  // So para teste, aqui serão carregadas as propriedades ativadaas
  // async created() {
  //   await this.$store.dispatch("properties/getProperties");
  //   this.teste();
  // },

  // computed: {
  //   ...mapGetters({ properties: "properties/properties" })
  //   // properties() {
  //   //   return this.$store.state.properties.properties;
  //   // }
  // },

  // methods: {
  //   teste() {
  //     console.log(this.properties);
  //   }
  // },

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
