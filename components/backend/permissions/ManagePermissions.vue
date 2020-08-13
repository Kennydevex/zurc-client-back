<template>
  <v-col>
    <v-dialog
      v-model="list_permissions_dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="640px"
      transition="dialog-transition"
    >
      <v-card>
        <v-tabs v-model="permissions_tab" color="primary">
          <v-tab>
            Permissões
          </v-tab>
          <v-tab>
            Funções
          </v-tab>
        </v-tabs>

    

        <v-tabs-items v-model="permissions_tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pa-0">
                <list-permissions></list-permissions>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text class="pa-0">
                <list-roles></list-roles>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  name: "ManagePermissions",

  components: {
    ListPermissions: () =>
      import("@/components/backend/permissions/ListPermissions"),
    ListRoles: () => import("@/components/backend/roles/ListRoles")
  },

  data() {
    return {
      permissions_tab: null
    };
  },

  computed: {
    list_permissions_dialog: {
      get() {
        return this.$store.state.permissions.list_permissions_dialog;
      },
      set(val) {
        this.$store.commit("permissions/list_permissions_dialog", val);
      }
    }
  }
};
</script>
