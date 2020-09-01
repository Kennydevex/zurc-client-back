<template>
  <base-section id="home-fetured-proprerties" space="15">
    <v-container fluid>
      <v-col cols="12"
        ><base-section-heading
          title="Propriedades em Destaque"
        ></base-section-heading
      ></v-col>
      <v-col cols="12" class="pa-0">
        <v-container grid-list-xs mb-0 pb-0>
          <v-row>
            <v-col class="pa-0">
              <vueper-slides
                autoplay
                fade
                :infinite="true"
                :bullets="false"
                class="no-shadow"
                :visible-slides="3"
                fixed-height="400px"
                slide-multiple
                :gap="2"
                :slide-ratio="1 / 4"
                :dragging-distance="200"
                :breakpoints="{
                  800: { visibleSlides: 2, slideMultiple: 2 },
                  640: { visibleSlides: 1, slideMultiple: 1 }
                }"
              >
                <template v-if="featured_properties.length != 0">
                  <template v-for="(property, i) in featured_properties">
                    <vueper-slide :key="'fatrd_proprt_' + i">
                      <template v-slot:content>
                        <v-container grid-list-xs fluid pa-0>
                          <base-featured-properties-card
                            ref="featured_card"
                            :trunc="50"
                            :property="property"
                          ></base-featured-properties-card>
                        </v-container>
                      </template>
                    </vueper-slide>
                  </template>
                </template>
              </vueper-slides>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-container>
  </base-section>
</template>

<script>
import { mapGetters } from "vuex";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "SectionThemeFeatures",

  computed: {
    ...mapGetters({ featured_properties: "properties/featured_properties" })
  },

  components: { VueperSlides, VueperSlide }
};
</script>
