<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-info-card :title="title" color="primary">
        <slot />
      </base-info-card>

      <template v-if="companies.length != 0">
        <template v-for="(contact, i) in companies[0].contacts">
          <base-avatar-card
            :key="i"
            v-if="contact.type === '1'"
            :icon="'mdi-phone'"
            :outlined="false"
            :title="!dense ? t : undefined"
            color="transparent"
            horizontal
            space="0"
          >
            <div>{{ contact.contact }}</div>
            <small>{{ contact.description }}</small>
          </base-avatar-card>
        </template>

        <v-divider></v-divider>

        <template v-for="(contact, i) in companies[0].contacts">
          <base-avatar-card
            :key="i"
            v-if="contact.type === '2'"
            :icon="'mdi-email'"
            :outlined="false"
            :title="!dense ? t : undefined"
            color="transparent"
            horizontal
            space="0"
          >
            <div>{{ contact.contact }}</div>
            <small>{{ contact.description }}</small>
          </base-avatar-card>
        </template>

        <v-divider></v-divider>

        <base-avatar-card
          :icon="'mdi-map-marker'"
          :outlined="false"
          :title="!dense ? t : undefined"
          color="transparent"
          horizontal
          space="0"
        >
          <div>{{ address }}</div>
          <small>Localização física da empresa</small>
        </base-avatar-card>
      </template>
    </div>
  </v-theme-provider>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BaseBusinessContact",
  props: {
    dark: Boolean,
    dense: Boolean,
    title: String
  },

  computed: {
    ...mapGetters({ companies: "companies/companies" }),

    address() {
      if (this.companies.length != 0) {
        return `${this.companies[0].location.state} - ${this.companies[0].location.city} - ${this.companies[0].location.zone}`;
      }
      return;
    }
  }

};
</script>
