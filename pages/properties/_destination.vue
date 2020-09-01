<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <properties-maps :properties="properties"></properties-maps>
      </v-col>
    </v-row>
    <v-container grid-list-xs>
      <v-row>
        <v-col cols="12" md="9">
          <v-row v-if="filteredPropertiesResult.length > 0">
            <v-col cols="12">
              <base-aside-title>Todas as Propriedades</base-aside-title>
            </v-col>

            <template v-for="(property, index) in filteredPropertiesResult">
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
                outlined
                type="info"
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
                @paginate="getPropertiesByDestinations($event)"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="3">
          <v-row>
            <v-col cols="12">
              <search></search>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" class="pb-0">
              <span class="font-weight-regular text-uppercase">Filtros</span>
              <base-divider color="primary" space="0"></base-divider>
            </v-col>

            <v-col cols="12" class="pb-0">
              <v-subheader>Preço entre: </v-subheader>
              <v-row>
                <v-col cols="6">
                  <Poptip
                    trigger="hover"
                    title="Preço Mínimo (Em ECV)"
                    :content="
                      max_price
                        ? 'Especifique o preço mínimo'
                        : 'Para ativar, defina o preço máximo'
                    "
                  >
                    <InputNumber
                      placeholder="Minimo (ECV)"
                      style="width: 100%"
                      :max="max_price"
                      v-model="min_price"
                      :disabled="!max_price"
                      :formatter="
                        value =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      "
                      :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                    >
                    </InputNumber>
                  </Poptip>
                </v-col>
                <v-col cols="6">
                  <Poptip
                    trigger="hover"
                    title="Preço Máximo (Em ECV)"
                    content="Especifique o limite de preço"
                  >
                    <InputNumber
                      :max="priceLimit[1]"
                      :min="min_price"
                      style="width: 100%"
                      v-model="max_price"
                      :formatter="
                        value =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      "
                      :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                    ></InputNumber>
                  </Poptip>
                </v-col>
              </v-row>
            </v-col>

            <!-- <v-col cols="12">
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
            </v-col>-->

            <v-col cols="12">
              <span
                >Não encontra o que procuras, contacte, peça ajuda aqui</span
              >
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
import { isUndefined, isNull, maxBy, minBy, forEach, uniq } from "lodash";
import { InputNumber, Poptip } from "view-design";
import PropertiesMaps from "@/views/sections/PropertiesMaps";
import Pagination from "@/components/common/Pagination";
import Search from "@/components/common/Search";

export default {
  name: "properties_by_destinations",
  layout: "frontend",

  mixins: [Vue2Filters.mixin],

  async fetch({ store, params }) {
    await store.dispatch(
      "properties/getPropertiesByDestinations",
      params.destination == "comprar"
        ? "1"
        : params.destination == "arrendar"
        ? "2"
        : params.destination == "permutar"
        ? "3"
        : "",
      1
    );
  },

  data() {
    return {
      isLoading: false,
      min_price: 0,
      max_price: 0,
      range: [0, 0]
    };
  },

  components: {
    // PropertiesMaps: () => import("@/views/sections/PropertiesMaps"),
    // Pagination: () => import("@/components/common/Pagination"),
    // Search: () => import("@/components/common/Search"),
    PropertiesMaps,
    Pagination,
    Search,
    InputNumber,
    Poptip
  },

  created() {
    // this.availableTypes;
  },

  computed: {
    ...mapGetters({
      properties: "properties/properties_by_destinations",
      pagination: "properties/pagination"
    }),
    // ===============================================
    priceLimit() {
      if (this.properties && this.properties.length > 0) {
        let max = maxBy(this.properties, function(o) {
          return o.price;
        });

        let min = minBy(this.properties, function(o) {
          return o.price;
        });
        return [min.price, max.price];
      }
      return;
    },

    // availableTypes() {
    //   if (this.properties.length > 0) {
    //     let types = [];
    //     let mthis = this;
    //     forEach(this.properties, function(property) {
    //       types.push(property.type);
    //     });
    //     console.log(uniq(types));
    //   }
    //   return;
    // },

    filteredPropertiesResult() {
      let mthis = this;
      return this.properties.filter(function(property) {
        if (
          (isNull(mthis.min_price) || mthis.min_price === 0) &&
          (isNull(mthis.max_price) || mthis.max_price === 0)
        ) {
          return true;
        } else {
          return (
            property.price >= mthis.min_price &&
            property.price <= mthis.max_price
          );
        }
      });

      // .filter(function(property) {
      //   if (
      //     isUndefined(mthis.type) ||
      //     isNull(mthis.type) ||
      //     mthis.type === "" ||
      //     mthis.type === "0"
      //   ) {
      //     return true;
      //   } else {
      //     return property.type === mthis.type;
      //   }
      // });
    }

    // filteredProperties() {
    //   let mthis = this;
    //   return this.properties
    //     .filter(function(property) {
    //       if (
    //         ((isNull(mthis.range[0]) || mthis.range[0] === 0) &&
    //           (isNull(mthis.range[1]) || mthis.range[1] === 0)) ||
    //         mthis.range[0] == mthis.range[1]
    //       ) {
    //         return true;
    //       } else {
    //         return (
    //           property.price >= mthis.range[0] &&
    //           property.price <= mthis.range[1]
    //         );
    //       }
    //     })
    //     .filter(function(property) {
    //       if (
    //         isUndefined(mthis.type) ||
    //         isNull(mthis.type) ||
    //         mthis.type === "" ||
    //         mthis.type === "0"
    //       ) {
    //         return true;
    //       } else {
    //         return property.type === mthis.type;
    //       }
    //     });
    // }
  },

  methods: {
    async getPropertiesByDestinations(page) {
      let income_type =
        this.$route.params.destination == "comprar"
          ? "1"
          : this.$route.params.destination == "arrendar"
          ? "2"
          : this.$route.params.destination == "permutar"
          ? "3"
          : "";
      this.isLoading = true;
      await this.$store.dispatch(
        "properties/getPropertiesByDestinations",
        income_type,
        page
      );
      this.isLoading = false;
    }
  }
};
</script>

<style scoped></style>
