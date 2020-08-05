<template>
  <base-section id="home-fetured-proprerties" space="15">
    <!--<base-section-heading title="Valores">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in!
      Asperiores, impedit libero. Veniam rerum saepe unde nihil possimus
      quibusdam esse accusamus mollitia magni fuga.
    </base-section-heading>-->

    <v-container fluid>
      <v-col cols="12"
        ><base-section-heading
          title="Propriedades em Destaque"
        ></base-section-heading
      ></v-col>
      <v-col cols="12" class="pb-0">
        <v-container grid-list-xs mb-0 pb-0>
          <v-row>
            <v-col class="pb-0">
              <vueper-slides
                autoplay
                :infinite="true"
                :bullets="false"
                class="no-shadow"
                :visible-slides="3"
                slide-multiple
                :gap="2"
                :slide-ratio="1 / 4"
                :dragging-distance="200"
                :breakpoints="{
                  800: { visibleSlides: 2, slideMultiple: 2 }
                }"
              >
                <vueper-slide v-for="i in 10" :key="i">
                  <template v-slot:content>
                    <v-card tile>
                      <v-img
                        :src="
                          `https://cdn.vuetifyjs.com/images/cards/desert.jpg`
                        "
                        height="120px"
                        aspect-ratio="2.75"
                        class="white--text align-end"
                      >
                        <v-card-title class="body-1 font-weight-regular"
                          >Titulo</v-card-title
                        >
                      </v-img>

                      <v-card-text>
                        <div class="text-capitalize">
                          <small>Data</small>
                        </div>
                        <div
                          class="grey--text text--darken-4 font-weight-regular pr-5"
                        >
                          <span>Descrição</span>
                        </div>
                      </v-card-text>

                      <v-card-actions class="pb-3 pt-0 pl-2">
                        <v-btn
                          color="primary"
                          text
                          small
                          left
                          :ripple="false"
                          class="font-weight-regular"
                          >Ler</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </vueper-slide>
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

  async created() {
    await this.$store.dispatch("services/getServices");
  },

  components: { VueperSlides, VueperSlide },

  computed: {
    ...mapGetters({ services: "services/services" })
  },

  data() {
    return {
      title: [],
      features: [
        {
          color: "primary",
          dark: true,
          title: "Pixel Perfect Design",
          icon: "mdi-fountain-pen-tip"
        },
        {
          color: "primary",
          dark: true,
          title: "Retina Ready",
          icon: "mdi-cellphone"
        },
        {
          color: "primary",
          dark: true,
          title: "Easily Customizable",
          icon: "mdi-pencil-box-outline"
        }
        // {
        //   title: "Image Parallax",
        //   icon: "mdi-image-size-select-actual"
        // },
        // {
        //   title: "Seo Optimized",
        //   icon: "mdi-ice-pop"
        // },
        // {
        //   title: "24/7 Support",
        //   icon: "mdi-help-circle-outline"
        // }
      ]
    };
  }
};
</script>
