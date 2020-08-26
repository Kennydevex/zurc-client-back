<template>
  <v-container grid-list-xs ma-0 pa-0 fluid>
    <v-row no-gutters="">
      <v-col>
        <v-container grid-list-xs ma-0 pa-0 fluid>
          <v-row no-gutters>
            <v-col cols="12">
                <google-maps></google-maps>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <v-container grid-list-xs>
          <v-row>
            <v-col cols="12" md="3" class="px-0">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <!--<search :search="search"></search>-->
                  <v-text-field
                    filled
                    dense
                    outlined
                    prepend-inner-icon="mdi-magnify"
                    name="name"
                    label="Procurar propriedades"
                    v-model="search"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pb-0">
                  <span class="font-weight-regular text-uppercase"
                    >Filtros</span
                  >
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
                    <!--<template v-slot:prepend>
                      <v-text-field
                        :value="range[0]"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                        @change="$set(range, 0, $event)"
                      ></v-text-field>
                    </template>
                    <template v-slot:append>
                      <v-text-field
                        :value="range[1]"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                        @change="$set(range, 1, $event)"
                      ></v-text-field>
                    </template>-->
                  </v-range-slider>
                </v-col>

                <v-col cols="12">
                  <v-subheader>Tipo de propriedade</v-subheader>

                  <v-radio-group :mandatory="false" v-model="type" dense>
                    <v-radio label="Todos" value="0"></v-radio>
                    <v-radio label="Apartamento" value="1"></v-radio>
                    <v-radio label="Moradia" value="2"></v-radio>
                    <v-radio label="Bloco de Apartamentos" value="3"></v-radio>
                    <v-radio label="Lote de Terreno" value="4"></v-radio>
                    <v-radio label="Loja" value="5"></v-radio>
                    <v-radio label="Armazem" value="6"></v-radio>
                    <v-radio label="Quinta" value="7"></v-radio>
                    <v-radio label="Garagem" value="8"></v-radio>
                    <v-radio label="Quarto" value="9"></v-radio>
                    <v-radio label="Escritório" value="10"></v-radio>
                    <v-radio label="Terreno" value="11"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-row>
                <v-col class="pa-0">
                  <properties-featured-properties></properties-featured-properties>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="9">
              <v-container grid-list-xs ma-0 pa-0>
                <v-row v-if="filteredProperties.length > 0">
                  <!-- <loading
                      :active.sync="isLoading"
                      :can-cancel="true"
                      :is-full-page="fullPage"
                    ></loading>-->
                  <template
                    v-for="(property, index) in filterBy(
                      filteredProperties,
                      search,
                      'name',
                      'description'
                    )"
                  >
                    <v-col cols="12" md="4" :key="'actd_proprt_' + index">
                      <!--:to="{
                          name: 'properties-ver-slug',
                          params: { slug: property.slug }
                        }"-->
                      <base-properties-card
                        :trunc="50"
                        :property="property"
                      ></base-properties-card>
                    </v-col>
                  </template>
                </v-row>

                <v-row v-if="filteredProperties.length === 0">
                  <v-col cols="12">
                    <v-alert
                      type="primary"
                      transition="scale-transition"
                      border="left"
                    >
                      Nenhum resultado produzido
                    </v-alert>
                  </v-col>
                </v-row>

                <v-divider class="my-5"></v-divider>

                <v-row align="center" justify="center">
                  <v-col>
                    <!-- Excelente -->
                    <Pagination
                      :data_source="pagination"
                      @paginate="getProperties($event)"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Vue2Filters from "vue2-filters";
// import Loading from "vue-loading-overlay";
// import "vue-loading-overlay/dist/vue-loading.css";

import { isNull, maxBy, minBy, debounce } from "lodash";

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
      type: "0"
    };
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
          if (isNull(mthis.type) || mthis.type === "" || mthis.type === "0") {
            return true;
          } else {
            return property.type === mthis.type;
          }
        });
    }

    // filteredProperties() {
    //   let mthis = this;
    //   return filter(this.actived_properties, function(property) {
    //     if (
    //       (isNull(mthis.range[0]) || mthis.range[0] === 0) &&
    //       (isNull(mthis.range[1]) || mthis.range[1] === 0)
    //     ) {
    //       return true;
    //     } else {
    //       var properties = property.price;
    //       return properties >= mthis.range[0] && properties <= mthis.range[1];
    //     }
    //   }).filter(this.actived_properties, function(property) {
    //     if (isNull(mthis.type) || mthis.type === "") {
    //       return true;
    //     } else {
    //       return property.type == this.type;
    //     }
    //   });
    // }

    // users() {
    //   // return this.$store.state.users.users;
    // }
  },

  components: {
    GoogleMaps: () => import("@/views/sections/GoogleMaps"),
    Pagination: () => import("@/components/common/Pagination"),
    PropertiesFeaturedProperties: () =>
      import("@/views/sections/PropertiesFeaturedProperties")
    // Loading
  }
};
</script>
