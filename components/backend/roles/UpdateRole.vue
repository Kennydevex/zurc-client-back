<template>
  <v-dialog
    v-model="update_role_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <role-form :formData="formData"></role-form>
  </v-dialog>
</template>

<script>
export default {
  name: "UpdateRole",

  components: {
    RoleForm: () => import("@/components/backend/forms/RoleForm")
  },

  data() {
    return {
      formData: {
        id: "",
        name: "",
        permissions: [],

      }
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_ROLE", role => {
        if (role) this.setRoleUpdateForm(role);
      });
    }
  },

  computed: {
    update_role_dialog: {
      get() {
        return this.$store.state.permissions.update_role_dialog;
      },
      set(val) {
        this.$store.commit("permissions/update_role_dialog", val);
      }
    }
  },

  methods: {
    async setRoleUpdateForm(role) {
      this.formData = role;
      this.$store.commit("permissions/toggleUpdateRoleDialog");
    }
  }
};
</script>
