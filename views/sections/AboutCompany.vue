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
  },

  data: () => ({
    cards: [
      {
        title: "Grow your Revenue",
        subtitle: "Best Productivity",
        text:
          "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborut dolorum fuga.harum quidem rerum facilis estexpedita distinctio.",
        callout: "01"
      },
      {
        title: "Affordable Prices",
        subtitle: "Special Offers",
        text:
          "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborut dolorum fuga.harum quidem rerum facilis estexpedita distinctio.",
        callout: "02"
      },
      {
        title: "Target Setting",
        subtitle: "Income Flow",
        text:
          "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborut dolorum fuga.harum quidem rerum facilis estexpedita distinctio.",
        callout: "03"
      }
    ]
  })
};
</script>
