<template>
  <base-section id="features" class="grey lighten-2">
    <v-responsive class="mx-auto" max-width="1350">
      <v-container fluid>
        <v-row justify="center">
          <v-col
            v-for="guideline in guidelines"
            :key="guideline.id"
            cols="12"
            sm="4"
            md="3"
          >
            <base-info-card align="center" v-bind="guideline">{{guideline.description}}</base-info-card>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </base-section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomeGuidelines",

  async created() {
    await this.$store.dispatch("guidelines/getGuidelines");
  },

  computed: {
    ...mapGetters({ guidelines: "guidelines/guidelines" })
  }
};
</script>
