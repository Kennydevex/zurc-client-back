<template>
  <div>
    <v-card>
      <v-toolbar color="white" flat>
        <v-text-field
          flat
          solo
          prepend-icon="mdi-magnify"
          placeholder="Procurar serviços"
          v-model="search"
          hide-details
          class="hidden-sm-and-down"
        ></v-text-field>
        <template v-if="selected.length > 0">
          <v-btn
            icon
            @click="onDelete('destinations', '', 'APP_UPDATE_DESTINATIONS_DATA', true)"
          >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </template>
        <v-btn
          @click.stop="onCreateDestination()"
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
          :items="destinations"
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
          <template v-slot:item.action="{ item }">
            <v-btn
              color="grey darken-2"
              small
              text
              class="text-none mr-1"
              @click="onUpdateDestination(item.id)"
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
              @click="onDelete('destinations', item.id, 'APP_UPDATE_DESTINATIONS_DATA')"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-none" text @click="closeListDestination()" small
          >Sair</v-btn
        >
      </v-card-actions>
    </v-card>
    <create-destination></create-destination>
    <update-destination></update-destination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas } from "@/mixins/formActions";

export default {
  mixins: [deleteDatas],

  name: "ListDestinations",

  computed: {
    ...mapGetters({ destinations: "destinations/destinations" })
  },

  data() {
    return {
      deleting: {},
      update_sending: {},
      search: "",
      selected: [],
      headers: [
        {
          text: "Finalidade",
          value: "name"
        },

        {
          text: "Descrição",
          value: "description"
        },
        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ],
      single_destination: []
    };
  },

  created() {
    // this.getDestinations();
    if (process.client) {
      window.getApp.$on("APP_UPDATE_DESTINATIONS_DATA", () => {
        this.getDestinations();
      });
    }
  },

  components: {
    CreateDestination: () => import("@/components/backend/destinations/CreateDestination"),
    UpdateDestination: () => import("@/components/backend/destinations/UpdateDestination")
  },

  methods: {
    async closeListDestination() {
      this.$store.commit("destinations/toggleListDestinationDialog");
      // await this.$store.dispatch("destinations/cleanDestinationsData");
    },
    async getDestinations() {
      await this.$store.dispatch("destinations/getDestinations");
    },

    async onCreateDestination() {
      this.$store.commit("destinations/toggleCreateDestinationDialog");
    },

    async onUpdateDestination(id) {
      this.$set(this.update_sending, id, true);
      let { data } = await this.$axios.$get(`destinations/${id}`);
      this.$data.single_destination = data;
      this.$set(this.update_sending, id, false);
      process.client
        ? window.getApp.$emit("APP_UPDATE_DESTINATION", this.$data.single_destination)
        : "";
    }
  }
};
</script>
