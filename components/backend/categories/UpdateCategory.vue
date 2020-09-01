<template>
  <v-dialog
    v-model="update_category_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <category-form :formData="formData"></category-form>
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
        description: "",
        icon: ""
      }
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_CATEGORY", category => {
        if (category) this.setServiceUpdateForm(category);
      });
    }
  },

  computed: {
    update_category_dialog: {
      get() {
        return this.$store.state.categories.update_category_dialog;
      },
      set(val) {
        this.$store.commit("categories/update_category_dialog", val);
      }
    }
  },

  methods: {
    async setServiceUpdateForm(category) {
      this.formData = category;
      this.$store.commit("categories/toggleUpdateServiceDialog");
    }
  }
};
</script>
