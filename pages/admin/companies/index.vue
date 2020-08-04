<template>
  <v-container grid-list-xs fluid>
    <v-row>
      <v-col cols="12" sm="6" md="8" align-self="center">
        <v-btn
          @click="onListGuidelines()"
          text
          color="primary"
          class="font-weight-bold"
          :loading="load_guidelines"
          >Diretrizes
          <template v-slot:loader>
            <span class="success--text text-none"
              >Carregando diretrizes...</span
            >
          </template></v-btn
        >
        <v-btn
          @click="onListServices()"
          text
          color="primary"
          class="font-weight-bold"
          :loading="load_services"
          >Serviços da empresa
          <template v-slot:loader>
            <span class="success--text text-none">Carregando serviços...</span>
          </template></v-btn
        >
        <v-btn
          text
          nuxt
          @click="redirectToPage('admin/properties')"
          color="primary"
          class="font-weight-bold"
          >Propriedades</v-btn
        >
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4" align-self="center">
        <v-text-field
          hide-details
          dense
          filled
          outlined
          prepend-inner-icon="mdi-magnify"
          name="name"
          label="Procurar empresas"
          disabled
        ></v-text-field
      ></v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">
        <v-card max-width="300">
          <v-img
            class="white--text align-end"
            height="100px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>{{ companies[0].name }}</v-card-title>
          </v-img>

          <v-card-actions>
            <v-btn icon disabled>
              <v-icon>mdi-eye</v-icon>
            </v-btn>

            <v-btn
              nuxt
              :to="{
                name: 'admin-companies-edit-slug',
                params: { slug: companies[0].slug }
              }"
              icon
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn icon disabled>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-flex xs12>
        <v-card-text class="company-action">
          <v-fab-transition>
            <v-btn
              nuxt
              :to="{ name: 'admin-companies-create' }"
              color="pink"
              dark
              absolute
              bottom
              right
              fab
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
      </v-flex>
    </v-row>

    <v-row>
      <services-index></services-index>
      <guidelines-index></guidelines-index>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "backend",
  middleware: "auth",

  components: {
    ServicesIndex: () => import("@/components/backend/services/ServicesIndex"),
    GuidelinesIndex: () =>
      import("@/components/backend/guidelines/GuidelinesIndex")
  },

  async fetch({ store }) {
    await store.dispatch("companies/getCompanies");
  },

  data() {
    return {
      show: false,
      load_services: false,
      load_guidelines: false
    };
  },

  computed: {
    ...mapGetters({ companies: "companies/companies" })
  },

  created: function() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_COMPANIES_DATA", () => {
        this.getCompanies();
      });
    }
  },

  methods: {
    async getCompanies() {
      await this.$store.dispatch("companies/getCompanies");
    },

    async onListServices() {
      this.load_services = true;
      await this.$store.dispatch("services/getServices");
      this.load_services = false;

      this.$store.commit("services/toggleListServiceDialog");
    },

    async onListGuidelines() {
      this.load_guidelines = true;
      await this.$store.dispatch("guidelines/getGuidelines");
      this.load_guidelines = false;

      this.$store.commit("guidelines/toggleListGuidelineDialog");
    }
  }
};
</script>

<style lang="stylus" scoped>
#company-action-action
  position: fixed
  z-index: 100
  bottom: 20px
</style>
