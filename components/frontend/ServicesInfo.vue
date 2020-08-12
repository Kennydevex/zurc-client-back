<template>
  <base-info-card name="Serviços">
    <template v-if="services.length != 0">
      <a
        v-for="service in services"
        :key="service.id"
        class="mb-8 grey--text body-1 d-block text-none"
        href="#"
       
      >
        {{ `&rsaquo; ${service.name}` }}</a
      >
    </template>
  </base-info-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ServicesInfo",

  //  async created() {
  //   await this.$store.dispatch("services/getServices");
  // },

  computed: {
    ...mapGetters({ services: "services/services" })
  }
};
</script>
