<template>
  <div>
    <v-card>
      <v-toolbar color="white" flat>
        <v-text-field
          flat
          solo
          prepend-icon="mdi-magnify"
          placeholder="Procurar categorias"
          v-model="search"
          hide-details
          class="hidden-sm-and-down"
        ></v-text-field>
        <template v-if="selected.length > 0">
          <v-btn
            icon
            @click="
              onDelete('categories', '', 'APP_UPDATE_CATEGORIES_DATA', true)
            "
          >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </template>
        <v-btn
          @click.stop="onCreateCategory()"
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
          :items="categories"
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
          <template v-slot:item.description="{ item }">
            <span>{{ item.description | truncate(100) }}</span>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn
              color="grey darken-2"
              small
              text
              class="text-none mr-1"
              @click="onUpdateCategory(item.id)"
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
              @click="
                onDelete('categories', item.id, 'APP_UPDATE_CATEGORIES_DATA')
              "
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-none" text @click="closeListCategory()" small
          >Sair</v-btn
        >
      </v-card-actions>
    </v-card>
    <create-category></create-category>
    <update-category></update-category>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas } from "@/mixins/formActions";

export default {
  mixins: [deleteDatas],

  name: "ListCategories",

  computed: {
    ...mapGetters({ categories: "categories/categories" })
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
      single_category: []
    };
  },

  created() {
    // this.getCategories();
    if (process.client) {
      window.getApp.$on("APP_UPDATE_CATEGORIES_DATA", () => {
        this.getCategories();
      });
    }
  },

  components: {
    CreateCategory: () =>
      import("@/components/backend/categories/CreateCategory"),
    UpdateCategory: () =>
      import("@/components/backend/categories/UpdateCategory")
  },

  methods: {
    async closeListCategory() {
      this.$store.commit("categories/toggleListCategoryDialog");
      // await this.$store.dispatch("categories/cleanCategoriesData");
    },
    async getCategories() {
      await this.$store.dispatch("categories/getCategories");
    },

    async onCreateCategory() {
      this.$store.commit("categories/toggleCreateCategoryDialog");
    },

    async onUpdateCategory(id) {
      this.$set(this.update_sending, id, true);
      let { data } = await this.$axios.$get(`categories/${id}`);
      this.$data.single_category = data;
      this.$set(this.update_sending, id, false);
      process.client
        ? window.getApp.$emit("APP_UPDATE_CATEGORY", this.$data.single_category)
        : "";
    }
  }
};
</script>
