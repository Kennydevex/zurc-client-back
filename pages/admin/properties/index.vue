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
      <template v-for="property in properties">
        <v-flex xs12 md3 :key="property.id">
          <v-card class="mx-auto">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-title v-text="property.name"> </v-card-title>

            <v-card-subtitle v-text="$moment(property.created_at).fromNow()">
            </v-card-subtitle>

            <v-card-actions>
              <v-btn text>Ver</v-btn>

              <v-btn color="purple" text>
                Editar
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="showDescription(property.id)">
                <v-icon>{{
                  show[property.id] ? "mdi-minus" : "mdi-plus"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show[property.id]">
                <v-divider></v-divider>
                <v-card-text v-text="property.description"> </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-flex>
      </template>

      <v-card-text class="company-action">
        <v-fab-transition>
          <v-btn
            nuxt
            :to="{ name: 'admin-properties-create' }"
            color="pink"
            dark
            fixed
            bottom
            right
            fab
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-card-text>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "backend",
  middleware: "auth",

  async fetch({ store }) {
    await store.dispatch("properties/getProperties");
  },

  data() {
    return {
      show: {}
    };
  },

  created: function() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_USERS_DATA", () => {
        this.getProperties();
      });
    }
  },

  computed: {
    ...mapGetters({ properties: "properties/properties" })
  },

  components: {
    MiniStatistic: () => import("@/components/backend/widgets/MiniStatistic")
  },

  methods: {
    showDescription(id) {
      if (this.show[id]) this.$set(this.show, id, false);
      else this.$set(this.show, id, true);
    },
    async getProperties() {
      await this.$store.dispatch("properties/getProperties");
    }
  }
};
</script>

<style lang="stylus" scoped>
#company-action
  position: fixed
  z-index: 100
  bottom: 20px
</style>
