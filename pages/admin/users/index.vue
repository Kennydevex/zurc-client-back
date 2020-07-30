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
        <v-btn color="success" @click="showAlert()">Alert</v-btn>
        <v-card>
          <v-toolbar color="white" flat>
            <v-text-field
              flat
              solo
              prepend-icon="mdi-magnify"
              placeholder="Type something"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
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
                  :color="item.status == true ? 'primary' : 'grey darken-2'"
                >
                  <span>{{ item.status == true ? "ativo" : "desativo" }}</span>
                  <span slot="loader" class="custom-loader-class">
                    <v-icon small>mdi-dots-horizontal</v-icon>
                  </span>
                </v-btn>
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
                <v-btn
                  color="grey darken-2"
                  small
                  text
                  class="text-none mr-1"
                  icon
                >
                  <v-icon>mdi-information</v-icon>
                </v-btn>
                <v-btn
                  color="grey darken-2"
                  small
                  text
                  class="text-none mr-1"
                  @click="updateEmployeeModal(item.name)"
                  icon
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
                  @click="onDelete()"
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
              fab
              dark
              small
              color="primary"
              nuxt
              :to="{ name: 'admin-users-create' }"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MiniStatistic from "@/components/backend/widgets/MiniStatistic";
import { mapGetters, mapActions } from "vuex";

export default {
  layout: "backend",

  name: "ListUsers",
  async fetch({ store }) {
    await store.dispatch("users/getUsers");
  },

  computed: {
    ...mapGetters({ users: "users/users" })
  },

  data() {
    return {
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
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ]
    };
  },

  components: {
    MiniStatistic
  },

  methods: {
    showAlert() {
      this.$swal({
        type: "error",
        title: "title",
        text: "text"
      });
    },
    updateEmployeeModal(id) {
      console.log(id);
    },

    onDelete() {
      console.log("id");
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
