<template>
  <v-dialog
    v-model="update_permission_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <permission-form :formData="formData"></permission-form>
  </v-dialog>
</template>

<script>
export default {
  name: "UpdatePermission",

  components: {
    PermissionForm: () => import("@/components/backend/forms/PermissionForm")
  },

  data() {
    return {
      formData: {
        id: "",
        name: "",
        roles: []
      }
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_PERMISSION", permission => {
        if (permission) this.setPermissionUpdateForm(permission);
      });
    }
  },

  computed: {
    update_permission_dialog: {
      get() {
        return this.$store.state.permissions.update_permission_dialog;
      },
      set(val) {
        this.$store.commit("permissions/update_permission_dialog", val);
      }
    }
  },

  methods: {
    async setPermissionUpdateForm(permission) {
      this.formData = permission;
      this.$store.commit("permissions/toggleUpdatePermissionDialog");
    }
  }
};
</script>
