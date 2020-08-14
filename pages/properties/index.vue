<template>
  <div>
    <v-container grid-list-xs ma-0 pa-0 fluid>
      <v-row no-gutters>
        <v-col cols="12">
          <google-maps></google-maps>
        </v-col>
      </v-row>
    </v-container>

    <v-container grid-list-xs>
      <v-row no-gutters>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="3">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <!--<search :search="search"></search>-->
                  <v-text-field
                    rounded
                    dense
                    outlined
                    prepend-inner-icon="mdi-magnify"
                    name="name"
                    label="Procurar propriedades"
                    v-model="search"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pb-0">
                  <v-subheader>Filtros</v-subheader>
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
              <v-container grid-list-xs ma-0 pa-0>
                <v-row>
                   <!-- <loading
                      :active.sync="isLoading"
                      :can-cancel="true"
                      :is-full-page="fullPage"
                    ></loading>-->
                  <template
                    v-for="(property, index) in filterBy(
                      actived_properties,
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue2Filters from "vue2-filters";
// import Loading from "vue-loading-overlay";
// import "vue-loading-overlay/dist/vue-loading.css";

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
      fullPage: true
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
    })
    // users() {
    //   // return this.$store.state.users.users;
    // }
  },

  components: {
    GoogleMaps: () => import("@/views/sections/GoogleMaps"),
    Search: () => import("@/components/frontend/Search"),
    Pagination: () => import("@/components/common/Pagination"),
    PropertiesFeaturedProperties: () =>
      import("@/views/sections/PropertiesFeaturedProperties"),
    // Loading
  }
};
</script>
