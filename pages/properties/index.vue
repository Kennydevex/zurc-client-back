<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <google-maps></google-maps>
      </v-col>
    </v-row>

    <v-container grid-list-xs>
      <v-row>
        <v-col cols="12" md="3">
          <v-row>
            <v-col cols="12" class="pb-0">
              <search></search>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-text-field
                filled
                dense
                outlined
                prepend-inner-icon="mdi-magnify"
                name="name"
                label="Filtrar nesta página"
                v-model="search"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" class="pb-0">
              <span class="font-weight-regular text-uppercase">Filtros</span>
              <base-divider color="primary" space="0"></base-divider>
            </v-col>

            <v-col cols="12" class="pb-0">
              <v-subheader
                >Preço entre ({{ range[0] | currency }} -
                {{ range[1] | currency }})</v-subheader
              >
              <v-range-slider
                :min="priceLimit[0]"
                :max="priceLimit[1]"
                v-model="range"
                hide-details
                class="align-center"
              >
              </v-range-slider>
            </v-col>

            <v-col cols="12">
              <v-subheader>Tipo de propriedade</v-subheader>
              <v-autocomplete
                auto-select-first
                v-model="type"
                :items="types"
                hide-no-data
                clearable
                disable-lookup
                item-value="id"
                item-text="name"
                outlined
                rounded
                dense
                label="Selecionar tipo de propriedade"
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row>
            <v-col>
              <properties-featured-properties></properties-featured-properties>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="9">
          <v-row v-if="filteredProperties.length > 0">
            <v-col cols="12">
              <base-aside-title>Todas as Propriedades</base-aside-title>
            </v-col>

            <template
              v-for="(property, index) in filterBy(
                filteredProperties,
                search,
                'name',
                'description'
              )"
            >
              <v-col cols="12" md="4" :key="'actd_proprt_' + index">
                <base-properties-card
                  :trunc="50"
                  :property="property"
                ></base-properties-card>
              </v-col>
            </template>
          </v-row>

          <v-row v-else>
            <v-col cols="12">
              <v-alert
                type="primary"
                transition="scale-transition"
                border="left"
              >
                Nenhum resultado produzido com este filtro
              </v-alert>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row align="center" justify="center">
            <v-col>
              <!-- Excelente -->
              <Pagination
                :data_source="pagination"
                @paginate="getProperties($event)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue2Filters from "vue2-filters";

import { isUndefined, isNull, maxBy, minBy, debounce } from "lodash";
export default {
  layout: "frontend",
  name: "PropertiesPages",
  mixins: [Vue2Filters.mixin],

  head() {
    return {
      title: "Propriedades",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  },

  async fetch({ store }) {
    await store.dispatch("properties/getActivedProperties", 1);
  },

  data() {
    return {
      currency_type: 1,
      search: "",
      isLoading: false,
      fullPage: true,
      slider: 40,
      range: [0, 0],
      type: "0",

      types: [
        { id: "0", name: "Todos" },
        { id: "1", name: "Apartamento" },
        { id: "2", name: "Moradia" },
        { id: "3", name: "Bloco de Apartamentos" },
        { id: "4", name: "Lote de Terreno" },
        { id: "5", name: "Loja" },
        { id: "6", name: "Armazem" },
        { id: "7", name: "Quinta" },
        { id: "8", name: "Garagem" },
        { id: "9", name: "Quarto" },
        { id: "10", name: "Escritório" },
        { id: "11", name: "Terreno" }
      ]
    };
  },

  components: {
    GoogleMaps: () => import("@/views/sections/GoogleMaps"),
    Pagination: () => import("@/components/common/Pagination"),
    Search: () => import("@/components/common/Search"),
    PropertiesFeaturedProperties: () =>
      import("@/views/sections/PropertiesFeaturedProperties")
  },

  methods: {
    async getProperties(page) {
      this.isLoading = true;
      await this.$store.dispatch("properties/getActivedProperties", page);
      this.isLoading = false;
    }
  },

  computed: {
    ...mapGetters({
      actived_properties: "properties/actived_properties",
      pagination: "properties/pagination"
    }),

    priceLimit() {
      if (this.actived_properties) {
        let max = maxBy(this.actived_properties, function(o) {
          return o.price;
        });

        let min = minBy(this.actived_properties, function(o) {
          return o.price;
        });
        return [min.price, max.price];
      }
      return;
    },

    filteredProperties() {
      let mthis = this;
      return this.actived_properties
        .filter(function(property) {
          if (
            ((isNull(mthis.range[0]) || mthis.range[0] === 0) &&
              (isNull(mthis.range[1]) || mthis.range[1] === 0)) ||
            mthis.range[0] == mthis.range[1]
          ) {
            return true;
          } else {
            return (
              property.price >= mthis.range[0] &&
              property.price <= mthis.range[1]
            );
          }
        })
        .filter(function(property) {
          if (
            isUndefined(mthis.type) ||
            isNull(mthis.type) ||
            mthis.type === "" ||
            mthis.type === "0"
          ) {
            return true;
          } else {
            return property.type === mthis.type;
          }
        });
    }
  }
};
</script>
