<template>
  <v-col>
    <v-dialog
      v-model="list_category_dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="640px"
      transition="dialog-transition"
    >
      <categories-list></categories-list>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  name: "IndexCategories",

  components: {
    CategoriesList: () => import("@/components/backend/categories/CategoriesList")
  },

  computed: {
    list_category_dialog: {
      get() {
        return this.$store.state.categories.list_category_dialog;
      },
      set(val) {
        this.$store.commit("categories/list_category_dialog", val);
      }
    }
  }
};
</script>
