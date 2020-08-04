<template>
  <v-col>
    <v-dialog
      v-model="list_guideline_dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="640px"
      transition="dialog-transition"
    >
      <guidelines-list></guidelines-list>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  name: "IndexGuidelines",

  components: {
    GuidelinesList: () => import("@/components/backend/guidelines/GuidelinesList")
  },

  computed: {
    list_guideline_dialog: {
      get() {
        return this.$store.state.guidelines.list_guideline_dialog;
      },
      set(val) {
        this.$store.commit("guidelines/list_guideline_dialog", val);
      }
    }
  }
};
</script>
