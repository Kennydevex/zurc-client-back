<template>
  <v-dialog
    v-model="create_role_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <role-form :formData="formData" :creating="true"></role-form>
  </v-dialog>
</template>

<script>
export default {
  name: "CreatePemission",

  data() {
    return {
      formData: {
        id: "",
        name: "",
        permissions: [],
      }
    };
  },

  components: {
    RoleForm: () => import("@/components/backend/forms/RoleForm")
  },

  computed: {
    create_role_dialog: {
      get() {
        return this.$store.state.permissions.create_role_dialog;
      },
      set(val) {
        this.$store.commit("permissions/create_role_dialog", val);
      }
    }
  }
};
</script>
