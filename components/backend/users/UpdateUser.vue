<template>
  <v-dialog
    v-model="update_user_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="640px"
    transition="dialog-transition"
  >
    <user-form :formData="formData"></user-form>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UpdateUser",

  components: {
    UserForm: () => import("@/components/backend/forms/UserForm")
  },

  data() {
    return {
      formData: {
        id: "",
        username: "",
        email: "",
        password: "",
        avatar: "",
        status: "",
        person: {
          id: "",
          name: "",
          gender: "",
          birthday: "",
          phone: ""
        },
        roles: [],
        permissions: []
      }
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_USER", user => {
        if (user) this.setUserUpdateForm(user);
      });
    }
  },

  computed: {
    update_user_dialog: {
      get() {
        return this.$store.state.dialogs.update_user_dialog;
      },
      set(val) {
        this.$store.commit("dialogs/update_user_dialog", val);
      }
    }
  },

  methods: {
    async setUserUpdateForm(user) {
      this.formData = user;
      this.$store.commit("dialogs/toggleUpdateUserDialog");
      await this.$store.dispatch("permissions/getRoles");
      await this.$store.dispatch("permissions/getPermissions");
    }
  }
};
</script>
