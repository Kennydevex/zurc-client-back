<template>
  <div>
    <v-card tile flat>
      <v-toolbar color="white" flat>
        <v-text-field
          flat
          solo
          prepend-icon="mdi-magnify"
          placeholder="Procurar Funções"
          v-model="search"
          hide-details
          class="hidden-sm-and-down"
        ></v-text-field>
        <template v-if="selected.length > 0">
          <v-btn
            icon
            @click="onDelete('roles', '', 'APP_UPDATE_ROLES_DATA', true)"
          >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </template>
        <v-btn
          @click.stop="onCreateRole()"
          class="ma-1"
          color="primary"
          fab
          icon
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn icon class="ma-1">
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <v-data-table
          :headers="headers"
          :search="search"
          :items="roles"
          :items-per-page="10"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          show-expand
          class="elevation-1"
          item-key="id"
          show-select
          v-model="selected"
          no-data-text="Aguardando resposta do servidor..."
          no-results-text="Nada para mostrar"
          :footer-props="{
            itemsPerPageText: 'Registos por página'
          }"
        >
          <template v-slot:item.action="{ item }">
            <v-btn
              color="grey darken-2"
              small
              text
              class="text-none mr-1"
              @click="onUpdateRole(item.id)"
              icon
              :loading="update_sending[item.id]"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <!-- :disabled="selected.length > 0" -->
            <v-btn
              color="grey darken-2"
              small
              text
              icon
              class="text-none"
              :loading="deleting[item.id]"
              @click="onDelete('roles', item.id, 'APP_UPDATE_ROLES_DATA')"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <template v-if="item.permissions.length">
                <v-chip
                  small
                  class="ma-1"
                  label
                  v-for="(permission, p) in item.permissions"
                  :key="p"
                  >{{ permission.name }}</v-chip
                >
              </template>
              <template v-else>
                <v-chip small label color="error"
                  >Sem nenhuma permissão vinculada</v-chip
                >
              </template>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-none" text @click="closeListPermissions()" small
          >Sair</v-btn
        >
      </v-card-actions>
    </v-card>
    <create-role></create-role>
    <update-role></update-role>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas } from "@/mixins/formActions";

export default {
  mixins: [deleteDatas],

  name: "ListRoles",

  computed: {
    ...mapGetters({ roles: "permissions/roles" })
  },

  data() {
    return {
      expanded: [],
      singleExpand: true,
      deleting: {},
      update_sending: {},
      search: "",
      selected: [],
      headers: [
        {
          text: "Nome",
          value: "name"
        },

        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        },
        { text: "", value: "data-table-expand" }
      ],
      single_role: []
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_ROLES_DATA", () => {
        this.getRoles();
      });
    }
  },

  components: {
    CreateRole: () => import("@/components/backend/roles/CreateRole"),
    UpdateRole: () => import("@/components/backend/roles/UpdateRole")
  },

  methods: {
    async closeListPermissions() {
      this.$store.commit("permissions/toggleListPermissionsDialog");
    },
    async getRoles() {
      await this.$store.dispatch("permissions/getRoles");
    },

    async onCreateRole() {
      this.$store.commit("permissions/toggleCreateRoleDialog");
    },

    async onUpdateRole(id) {
      this.$set(this.update_sending, id, true);
      let { data } = await this.$axios.$get(`roles/${id}`);
      this.$data.single_role = data;
      this.$set(this.update_sending, id, false);
      process.client
        ? window.getApp.$emit("APP_UPDATE_ROLE", this.$data.single_role)
        : "";
    }
  }
};
</script>
