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
            @click="onDelete('services', '', 'APP_UPDATE_SERVICES_DATA', true)"
          >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </template>
        <v-btn
          @click.stop="onCreateService()"
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
          :items="services"
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
              @click="onUpdateService(item.id)"
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
              @click="onDelete('services', item.id, 'APP_UPDATE_SERVICES_DATA')"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-none" text @click="closeListService()" small
          >Sair</v-btn
        >
      </v-card-actions>
    </v-card>
    <create-service></create-service>
    <update-service></update-service>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas } from "@/mixins/formActions";

export default {
  mixins: [deleteDatas],

  name: "ListServices",

  computed: {
    ...mapGetters({ services: "services/services" })
  },

  data() {
    return {
      deleting: {},
      update_sending: {},
      search: "",
      selected: [],
      headers: [
        {
          text: "Nome do serviço",
          value: "name"
        },

        {
          text: "Descrição do Serviço",
          value: "description"
        },
        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        }
      ],
      single_service: []
    };
  },

  created() {
    // this.getServices();
    if (process.client) {
      window.getApp.$on("APP_UPDATE_SERVICES_DATA", () => {
        this.getServices();
      });
    }
  },

  components: {
    CreateService: () => import("@/components/backend/services/CreateService"),
    UpdateService: () => import("@/components/backend/services/UpdateService")
  },

  methods: {
    async closeListService() {
      this.$store.commit("services/toggleListServiceDialog");
      // await this.$store.dispatch("services/cleanServicesData");
    },
    async getServices() {
      await this.$store.dispatch("services/getServices");
    },

    async onCreateService() {
      this.$store.commit("services/toggleCreateServiceDialog");
    },

    async onUpdateService(id) {
      this.$set(this.update_sending, id, true);
      let { data } = await this.$axios.$get(`services/${id}`);
      this.$data.single_service = data;
      this.$set(this.update_sending, id, false);
      process.client
        ? window.getApp.$emit("APP_UPDATE_SERVICE", this.$data.single_service)
        : "";
    }
  }
};
</script>
