<template>
  <v-container grid-list-xs fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <UserForm />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "CreateUser",
  layout: "backend",
  middleware: ["auth"],

  components: {
    UserForm: () => import("@/components/backend/forms/UserForm")
  }
};
</script>
