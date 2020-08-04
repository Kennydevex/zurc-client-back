<template>
  <v-dialog
    v-model="create_destination_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <destination-form :formData="formData" :creating="true"></destination-form>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateDestination",

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: ""
      }
    };
  },

  components: {
    DestinationForm: () => import("@/components/backend/forms/DestinationForm")
  },

  computed: {
    create_destination_dialog: {
      get() {
        return this.$store.state.destinations.create_destination_dialog;
      },
      set(val) {
        this.$store.commit("destinations/create_destination_dialog", val);
      }
    }
  }
};
</script>
