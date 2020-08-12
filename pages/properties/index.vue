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
    await store.dispatch("properties/getActivedProperties");
  },

  data() {
    return {
      currency_type: 1,
      search: ""
    };
  },

  computed: {
    ...mapGetters({ actived_properties: "properties/actived_properties" })
    // users() {
    //   // return this.$store.state.users.users;
    // }
  },

  components: {
    GoogleMaps: () => import("@/views/sections/GoogleMaps"),
    Search: () => import("@/components/frontend/Search"),
    PropertiesFeaturedProperties: () =>
      import("@/views/sections/PropertiesFeaturedProperties")
  }
};
</script>
