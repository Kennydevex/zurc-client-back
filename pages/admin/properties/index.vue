<template>
  <v-container grid-list-xl fluid>
    <v-layout>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-home-city"
          :title="`${totalPropreties}`"
          sub-title="Propriedades"
          color="indigo"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-check-all"
          :title="`${activedPropreties}`"
          sub-title="Ativos"
          color="red"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-home-lock"
          :title="`${inactivedPropreties}`"
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

    <v-divider></v-divider>

    <v-row justify="end">
      <v-col cols="12" sm="6" md="8" align-self="center">
        <v-btn
          text
          color="primary"
          class="font-weight-bold"
          @click="onListDestinations()"
          :loading="load_destinations"
          >Finalidade das propriedades
          <template v-slot:loader>
            <span class="success--text text-none">Carregando...</span>
          </template></v-btn
        >
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4" align-self="center">
        <v-text-field
          hide-details
          dense
          filled
          outlined
          prepend-inner-icon="mdi-magnify"
          name="name"
          label="Procurar Propriedades"
          v-model="filter_data"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-layout row wrap>
      <!--{{
        145673665
          | currency("ECV", 0, {
            spaceBetweenAmountAndSymbol: true,
            symbolOnLeft: false
          })
      }}-->

      <template
        v-for="property in limitBy(
          filterBy(properties, filter_data, 'name', 'description'),
          limitByn
        )"
      >
        <v-flex xs12 md4 :key="property.id">
          <v-card
            class="mx-auto"
            @mouseenter.stop="$set(show_actions, property.id, true)"
            @mouseleave.stop="$set(show_actions, property.id, false)"
          >
            <v-img
              :src="`${publicURL}/uploads/${property.cover}`"
              height="170px"
            ></v-img>

            <v-card-title>{{ property.name }}} </v-card-title>

            <v-card-subtitle
              >{{ $moment(property.created_at).fromNow() }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="primary" rounded small text>Ver</v-btn>
              <template v-if="show_actions[property.id]">
                <v-btn
                  v-permission:any="'Editar Propriedade|Gerir Propriedades'"
                  class="text-none"
                  color="grey darken-1"
                  text
                  nuxt
                  icon
                  :to="{
                    name: 'admin-properties-edit-slug',
                    params: { slug: property.slug }
                  }"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn
                  v-permission:any="'Eliminar Propriedade|Gerir Propriedades'"
                  @click="
                    onDelete(
                      'properties',
                      property.id,
                      'APP_UPDATE_PROPERTIES_DATA'
                    )
                  "
                  class="text-none"
                  color="grey darken-1"
                  text
                  icon
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

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
                <v-card-text
                  >{{ property.description | truncate(3) }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-flex>
      </template>
      <v-flex xs12>
        <v-btn
          v-if="properties.length >= limitByn"
          text
          small
          color="primary"
          @click.prevent="limitByn += 6"
          >Mostrar mais</v-btn
        >
        <v-btn
          v-if="limitByn >= 8"
          text
          small
          color="primary"
          @click.prevent="limitByn -= 6"
          >Mostrar Menos</v-btn
        >
      </v-flex>

      <v-card-text
        class="company-action"
        v-permission:any="'Gerir|Criar Propriedade|Gerir Propriedades'"
        v-role:any="'Admin|Gestor'"
      >
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
    <v-row>
      <destinations-index></destinations-index>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Vue2Filters from "vue2-filters";
import { deleteDatas } from "@/mixins/formActions";

export default {
  layout: "backend",
  middleware: "auth",
  mixins: [Vue2Filters.mixin, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("properties/getProperties");
  },

  data() {
    return {
      load_destinations: false,
      selected: [],
      show_actions: {},
      limitByn: 6,
      show: {},
      filter_data: ""
    };
  },

  created: function() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_PROPERTIES_DATA", () => {
        this.getProperties();
      });
    }
  },

  computed: {
    ...mapGetters({ properties: "properties/properties" }),
    totalPropreties() {
      return this.properties.length;
    },
    activedPropreties() {
      return this.properties.filter(property => {
        return property.status == true;
      }).length;
    },

    inactivedPropreties() {
      return this.properties.filter(property => {
        return property.status == false;
      }).length;
    }
  },

  components: {
    MiniStatistic: () => import("@/components/backend/widgets/MiniStatistic"),
    DestinationsIndex: () =>
      import("@/components/backend/destinations/DestinationsIndex")
  },

  methods: {
    showDescription(id) {
      if (this.show[id]) this.$set(this.show, id, false);
      else this.$set(this.show, id, true);
    },

    async getProperties() {
      await this.$store.dispatch("properties/getProperties");
    },

    async onListDestinations() {
      this.load_destinations = true;
      await this.$store.dispatch("destinations/getDestinations");
      this.load_destinations = false;

      this.$store.commit("destinations/toggleListDestinationDialog");
    }
  }
};
</script>

<style lang="stylus" scoped>
#company-action
  position: fixed
  z-index: 100
  bottom: 20px

.fade-enter-active, .fade-leave-active
  transition: opacity .5s;

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
</style>
