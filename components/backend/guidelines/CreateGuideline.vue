<template>
  <v-dialog
    v-model="create_guideline_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <guideline-form :formData="formData" :creating="true"></guideline-form>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateGuideline",

  data() {
    return {
      formData: {
        id: "",
        designation: "",
        presentation: ""
      }
    };
  },

  components: {
    GuidelineForm: () => import("@/components/backend/forms/GuidelineForm")
  },

  computed: {
    create_guideline_dialog: {
      get() {
        return this.$store.state.guidelines.create_guideline_dialog;
      },
      set(val) {
        this.$store.commit("guidelines/create_guideline_dialog", val);
      }
    }
  }
};
</script>
