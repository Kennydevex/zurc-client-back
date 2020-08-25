<template>
  <base-section id="about-comapny">
    <base-section-heading
      color="primary"
      icon="mdi-vuetify"
      title="Sobre a nossa empresa"
    />

    <v-container>
      <v-row>
        <v-col cols="12">
          <base-body v-if="companies.length != 0">
            {{ companies[0].about }}
          </base-body>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SectionAboutCompany",

  computed: {
    ...mapGetters({ companies: "companies/companies" })
  }
};
</script>
