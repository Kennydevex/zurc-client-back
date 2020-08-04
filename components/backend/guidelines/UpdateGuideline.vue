<template>
  <v-dialog
    v-model="update_guideline_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <guideline-form :formData="formData"></guideline-form>
  </v-dialog>
</template>

<script>
export default {
  name: "UpdateGuideline",

  components: {
    GuidelineForm: () => import("@/components/backend/forms/GuidelineForm")
  },

  data() {
    return {
      formData: {
        id: "",
        designation: "",
        presentation: ""
      }
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_GUIDELINE", guideline => {
        if (guideline) this.setGuidelineUpdateForm(guideline);
      });
    }
  },

  computed: {
    update_guideline_dialog: {
      get() {
        return this.$store.state.guidelines.update_guideline_dialog;
      },
      set(val) {
        this.$store.commit("guidelines/update_guideline_dialog", val);
      }
    }
  },

  methods: {
    async setGuidelineUpdateForm(guideline) {
      this.formData = guideline;
      this.$store.commit("guidelines/toggleUpdateGuidelineDialog");
    }
  }
};
</script>
