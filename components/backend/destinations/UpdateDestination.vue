<template>
  <v-dialog
    v-model="update_destination_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <destination-form :formData="formData"></destination-form>
  </v-dialog>
</template>

<script>
export default {
  name: "UpdateDestination",

  components: {
    DestinationForm: () => import("@/components/backend/forms/DestinationForm")
  },

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: ""
      }
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_DESTINATION", destination => {
        if (destination) this.setDestinationUpdateForm(destination);
      });
    }
  },
  
  computed: {
    update_destination_dialog: {
      get() {
        return this.$store.state.destinations.update_destination_dialog;
      },
      set(val) {
        this.$store.commit("destinations/update_destination_dialog", val);
      }
    }
  },

  methods: {
    async setDestinationUpdateForm(destination) {
      this.formData = destination;
      this.$store.commit("destinations/toggleUpdateDestinationDialog");
    }
  }
};
</script>
