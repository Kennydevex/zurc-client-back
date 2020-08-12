<template>
  <base-section id="home-services" space="40">
    <v-container>
      <v-row>
        <v-col cols="12"
          ><base-section-heading title="Serviços"></base-section-heading>
        </v-col>

        <template v-if="services.length != 0">
          <v-col
            v-for="(service, i) in limitBy(services, 3)"
            :key="i"
            cols="12"
            md="4"
          >
            <base-card-service v-bind="service" align="left" horizontal>
              {{ service.description | truncate(100) }}
            </base-card-service>
          </v-col>
        </template>

        <v-col class="pa-0" align="center" justify="center"
          ><v-btn
            nuxt
            to="/services"
            color="accent"
            text
            small
            class="text-none font-weight-regular text-decoration-underline"
            >Ver Todos</v-btn
          ></v-col
        >
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
import { mapGetters } from "vuex";
import Vue2Filters from "vue2-filters";

export default {
  name: "SectionThemeFeatures",

  mixins: [Vue2Filters.mixin],

  // async created() {
  //   await this.$store.dispatch("services/getServices");
  // },

  computed: {
    ...mapGetters({ services: "services/services" })
  },

  data() {
    return {
      title: []
    };
  }
};
</script>
