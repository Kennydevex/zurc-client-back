<template>
  <base-info-card title="Serviços">
    <template v-if="services.length != 0">
      <a
        v-for="service in services"
        :key="service.id"
        class="mb-8 grey--text body-1 d-block text-none"
        href="#"
        v-html="`&rsaquo; ${service.name}`"
      />
    </template>
  </base-info-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ServicesInfo",

  computed: {
    ...mapGetters({ services: "services/services" })
  }
};
</script>
