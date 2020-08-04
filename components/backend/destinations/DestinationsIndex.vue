<template>
  <v-col>
    <v-dialog
      v-model="list_destination_dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="640px"
      transition="dialog-transition"
    >
      <destinations-list></destinations-list>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  name: "IndexDestinations",

  components: {
    DestinationsList: () => import("@/components/backend/destinations/DestinationsList")
  },

  computed: {
    list_destination_dialog: {
      get() {
        return this.$store.state.destinations.list_destination_dialog;
      },
      set(val) {
        this.$store.commit("destinations/list_destination_dialog", val);
      }
    }
  }
};
</script>
