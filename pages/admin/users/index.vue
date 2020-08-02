<template>
  <v-container grid-list-xl fluid>
    <v-layout>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-account-group"
          title="20"
          sub-title="Utilizadores"
          color="indigo"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-account-check"
          title="10"
          sub-title="Ativos"
          color="red"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-account-lock"
          title="5"
          sub-title="Inativos"
          color="light-blue"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-instagram"
          title="50+"
          sub-title="Shots"
          color="purple"
        >
        </mini-statistic>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex lg12>
        <span v-role="'Add'">Estefanio Silva</span>
        <v-btn v-permission="'Add'" color="success">text</v-btn>
        <v-card>
          <v-toolbar color="white" flat>
            <v-text-field
              flat
              solo
              prepend-icon="mdi-magnify"
              placeholder="Procurar Utilizadores"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <template v-if="selected.length > 0">
              <v-btn
                icon
                @click="onDelete('users', '', 'APP_UPDATE_USERS_DATA', true)"
              >
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </template>
            <!--<v-btn class="ma-1" color="primary" small rounded>
              Adicionar
            </v-btn>-->
            <v-btn icon class="ma-1">
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :search="search"
              :items="users"
              :items-per-page="10"
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
              <template v-slot:item.status="{ item }">
                <v-btn
                  x-small
                  text
                  class="text-capitalize"
                  :loading="loadAtivaction[item.id]"
                  :color="item.status == true ? 'success' : 'grey darken-2'"
                  @click="
                    toggleStatus(
                      'users/user-activation',
                      item.id,
                      item.status,
                      'Utilizador',
                      'APP_UPDATE_USERS_DATA'
                    )
                  "
                >
                  <span>{{ item.status == true ? "ativo" : "desativo" }}</span>
                  <span slot="loader" class="custom-loader-class">
                    <v-icon small>mdi-dots-horizontal</v-icon>
                  </span>
                </v-btn>
              </template>

              <template v-slot:item.created_at="{ item }">
                <div
                  v-text="$moment(item.created_at, 'YYYYMMDD').fromNow()"
                ></div>
              </template>

              <!--<template v-slot:item.avatar="{ item }">
                <v-avatar size="36px" color="grey lighten-3">
                  <img
                    v-if="item.avatar"
                    alt="Foto de Perfil"
                    :src="item.avatar"
                  />
                  <v-icon
                    v-else
                    :color="message.color"
                    v-text="message.icon"
                  ></v-icon>
                </v-avatar>
              </template>-->

              <template v-slot:item.action="{ item }">
                <!--<v-btn
                  color="grey darken-2"
                  small
                  text
                  class="text-none mr-1"
                  icon
                >
                  <v-icon>mdi-information</v-icon>
                </v-btn>-->
                <v-btn
                  color="grey darken-2"
                  small
                  text
                  class="text-none mr-1"
                  @click="onUpdateUser(item.id)"
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
                  @click="onDelete('users', item.id, 'APP_UPDATE_USERS_DATA')"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-row>
      <v-col>
        <v-card id="users-action">
          <v-speed-dial
            color="primary"
            v-model="fab"
            bottom="bottom"
            right="right"
            direction="top"
            transition="slide-y-reverse-transition"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="primary" dark fab>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-btn
              :loading="add_sending"
              fab
              dark
              small
              color="primary"
              @click.stop="onCreateUser()"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <create-user></create-user>
      <update-user></update-user>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas } from "@/mixins/formActions";
import { handleActivations } from "@/mixins/formActions";

export default {
  mixins: [deleteDatas, handleActivations],

  layout: "backend",

  name: "ListUsers",

  async fetch({ store }) {
    await store.dispatch("users/getUsers");
  },

  created: function() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_USERS_DATA", () => {
        this.getUsers();
      });
    }
  },

  computed: {
    ...mapGetters({ users: "users/users" })
  },

  data() {
    return {
      add_sending: false,
      update_sending: {},
      fab: false,
      search: "",
      selected: [],
      headers: [
        {
          text: "Nome",
          value: "person.name"
        },

        {
          text: "Utilizador",
          value: "username"
        },

        {
          text: "Email",
          value: "email"
        },
        {
          text: "Estado",
          value: "status",
          align: "center"
        },
        {
          text: "Criado em:",
          value: "created_at",
          align: "center"
        },
        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ],
      single_user: []
    };
  },

  // async created() {
  //   this.checkPermissions();
  //   const { data: permissions } = await this.$axios.get("laravel-permissions");
  //   const { data: roles } = await this.$axios.get("laravel-roles");
  //   this.$laravel.setPermissions(permissions);
  //   this.$laravel.setRoles(roles);
  // },

  components: {
    MiniStatistic: () => import("@/components/backend/widgets/MiniStatistic"),
    CreateUser: () => import("@/components/backend/users/Create"),
    UpdateUser: () => import("@/components/backend/users/Update")
  },

  methods: {
    checkPermissions() {
      console.log(this.$laravel.getPermissions());
    },
    async getUsers() {
      await this.$store.dispatch("users/getUsers");
    },

    async onCreateUser() {
      this.add_sending = true;
      await this.$store.dispatch("permissions/getPermissions");
      await this.$store.dispatch("permissions/getRoles");
      this.add_sending = false;
      this.$store.commit("dialogs/toggleCreateUserDialog");
    },

    async onUpdateUser(id) {
      this.$set(this.update_sending, id, true);
      let { data } = await this.$axios.$get(`users/${id}`);
      this.$data.single_user = data;
      this.$set(this.update_sending, id, false);
      process.client
        ? window.getApp.$emit("APP_UPDATE_USER", this.$data.single_user)
        : "";
    }
  }
};
</script>

<style lang="stylus" scoped>
#users-action .v-speed-dial
  position: fixed
  z-index: 100
  bottom: 35px


#users-action .v-btn--floating
  position: relative
</style>
