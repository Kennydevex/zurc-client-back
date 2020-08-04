<template>
  <v-dialog
    v-model="update_service_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <service-form :formData="formData"></service-form>
  </v-dialog>
</template>

<script>
export default {
  name: "UpdateService",

  components: {
    ServiceForm: () => import("@/components/backend/forms/ServiceForm")
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
      window.getApp.$on("APP_UPDATE_SERVICE", service => {
        if (service) this.setServiceUpdateForm(service);
      });
    }
  },

  computed: {
    update_service_dialog: {
      get() {
        return this.$store.state.services.update_service_dialog;
      },
      set(val) {
        this.$store.commit("services/update_service_dialog", val);
      }
    }
  },

  methods: {
    async setServiceUpdateForm(service) {
      this.formData = service;
      this.$store.commit("services/toggleUpdateServiceDialog");
    }
  }
};
</script>
