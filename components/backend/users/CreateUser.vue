<template>
  <v-dialog
    v-model="create_user_dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="640px"
    transition="dialog-transition"
  >
    <user-form :formData="formData" :creating="true"></user-form>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateUser",

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
 
  components: {
    UserForm: () => import("@/components/backend/forms/UserForm")
  },

  computed: {
    create_user_dialog: {
      get() {
        return this.$store.state.dialogs.create_user_dialog;
      },
      set(val) {
        this.$store.commit("dialogs/create_user_dialog", val);
      }
    }
  }
};
</script>
