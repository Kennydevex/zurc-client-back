<template>
  <v-dialog
    v-model="create_permission_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <permission-form :formData="formData" :creating="true"></permission-form>
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
        roles: [],
      }
    };
  },

  components: {
    PermissionForm: () => import("@/components/backend/forms/PermissionForm")
  },

  computed: {
    create_permission_dialog: {
      get() {
        return this.$store.state.permissions.create_permission_dialog;
      },
      set(val) {
        this.$store.commit("permissions/create_permission_dialog", val);
      }
    }
  }
};
</script>
