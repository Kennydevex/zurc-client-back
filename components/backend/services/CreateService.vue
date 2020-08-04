<template>
  <v-dialog
    v-model="create_service_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <service-form :formData="formData" :creating="true"></service-form>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateService",

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
    ServiceForm: () => import("@/components/backend/forms/ServiceForm")
  },

  computed: {
    create_service_dialog: {
      get() {
        return this.$store.state.services.create_service_dialog;
      },
      set(val) {
        this.$store.commit("services/create_service_dialog", val);
      }
    }
  }
};
</script>
