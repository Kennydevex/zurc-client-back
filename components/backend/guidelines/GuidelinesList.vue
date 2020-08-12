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
            @click="onDelete('guidelines', '', 'APP_UPDATE_GUIDELINES_DATA', true)"
          >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </template>
        <v-btn
          @click.stop="onCreateGuideline()"
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
          :items="guidelines"
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
              @click="onUpdateGuideline(item.id)"
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
              @click="onDelete('guidelines', item.id, 'APP_UPDATE_GUIDELINES_DATA')"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-none" text @click="closeListGuideline()" small
          >Sair</v-btn
        >
      </v-card-actions>
    </v-card>
    <create-guideline></create-guideline>
    <update-guideline></update-guideline>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas } from "@/mixins/formActions";

export default {
  mixins: [deleteDatas],

  name: "ListGuidelines",

  computed: {
    ...mapGetters({ guidelines: "guidelines/guidelines" })
  },

  data() {
    return {
      deleting: {},
      update_sending: {},
      search: "",
      selected: [],
      headers: [
        {
          text: "Designação",
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
      single_guideline: []
    };
  },

  created() {
    // this.getGuidelines();
    if (process.client) {
      window.getApp.$on("APP_UPDATE_GUIDELINES_DATA", () => {
        this.getGuidelines();
      });
    }
  },

  components: {
    CreateGuideline: () => import("@/components/backend/guidelines/CreateGuideline"),
    UpdateGuideline: () => import("@/components/backend/guidelines/UpdateGuideline")
  },

  methods: {
    async closeListGuideline() {
      this.$store.commit("guidelines/toggleListGuidelineDialog");
      // await this.$store.dispatch("guidelines/cleanGuidelinesData");
    },
    async getGuidelines() {
      await this.$store.dispatch("guidelines/getGuidelines");
    },

    async onCreateGuideline() {
      this.$store.commit("guidelines/toggleCreateGuidelineDialog");
    },

    async onUpdateGuideline(id) {
      this.$set(this.update_sending, id, true);
      let { data } = await this.$axios.$get(`guidelines/${id}`);
      this.$data.single_guideline = data;
      this.$set(this.update_sending, id, false);
      process.client
        ? window.getApp.$emit("APP_UPDATE_GUIDELINE", this.$data.single_guideline)
        : "";
    }
  }
};
</script>
