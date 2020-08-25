<template>
  <v-container grid-list-xs>
    <v-row wrap>
      <v-col cols="12" class="pa-0">
        <base-aside-title>Propriedades em destaque</base-aside-title>
      </v-col>
      <v-col cols="12" class="pa-0">
        <client-only>
          <vueper-slides
            autoplay
            :bullets="false"
            :infinite="true"
            class="no-shadow"
            :visible-slides="1"
            slide-multiple
            :gap="2"
            fixed-height="345px"
            :dragging-distance="200"
          >
            <template v-if="featured_properties.length != 0">
              <template v-for="(property, i) in featured_properties">
                <vueper-slide :key="'fatrd_proprt_' + i">
                  <template v-slot:content>
                    <v-container grid-list-xs fluid pa-0 ma-0>
                      <base-properties-card
                      :trunc="25"
                        :property="property"
                      ></base-properties-card>
                    </v-container>
                  </template>
                </vueper-slide>
              </template>
            </template>
          </vueper-slides>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "SectionThemeFeatures",

  async created() {
    await this.$store.dispatch("properties/getFeaturedProperties");
  },

  computed: {
    ...mapGetters({ featured_properties: "properties/featured_properties" })
  },

  components: { VueperSlides, VueperSlide },

  data() {
    return {
      currency_type: 1
    };
  }
};
</script>
