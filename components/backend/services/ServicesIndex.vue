<template>
  <v-col>
    <v-dialog
      v-model="list_service_dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="640px"
      transition="dialog-transition"
    >
      <services-list></services-list>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  name: "IndexServices",

  components: {
    ServicesList: () => import("@/components/backend/services/ServicesList")
  },

  computed: {
    list_service_dialog: {
      get() {
        return this.$store.state.services.list_service_dialog;
      },
      set(val) {
        this.$store.commit("services/list_service_dialog", val);
      }
    }
  }
};
</script>
