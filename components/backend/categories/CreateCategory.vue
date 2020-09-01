<template>
  <v-dialog
    v-model="create_category_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <category-form :formData="formData" :creating="true"></category-form>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateCategory",

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
        icon:""
      }
    };
  },

  components: {
    CategoryForm: () => import("@/components/backend/forms/CategoryForm")
  },

  computed: {
    create_category_dialog: {
      get() {
        return this.$store.state.categories.create_category_dialog;
      },
      set(val) {
        this.$store.commit("categories/create_category_dialog", val);
      }
    }
  }
};
</script>
