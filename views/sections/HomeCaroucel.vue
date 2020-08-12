<template>
  <section id="home-slider">
    <client-only>
      <vueper-slides
        class="no-shadow"
        :slide-ratio="1 / 2"
        fixed-height="600px"
        lazy
        lazy-load-on-drag
        fade
        ref="myVueperSlides"
        autoplay
        @image-loaded="lazy_progress = false"
        :pause-on-hover="pauseOnHover"
        @autoplay-pause="internalAutoPlaying = false"
        @autoplay-resume="internalAutoPlaying = true"
      >
        <vueper-slide
          v-for="slide in slides"
          :key="slide.id"
          :image="slide.image"
        >
          <template v-slot:content>
            <v-container class="fill-height">
              <v-responsive
                class="d-flex align-center"
                max-width="500"
                width="100%"
              >
                <base-heading :title="slide.title" />

                <base-body>
                  {{ slide.content }}
                </base-body>

                <div
                  :class="
                    $vuetify.breakpoint.smAndDown
                      ? 'flex-column align-start'
                      : 'align-center'
                  "
                  class="d-flex flex-wrap"
                >
                  <base-btn>
                    Solicitar Orçamento
                  </base-btn>
                </div>
              </v-responsive>
            </v-container>
          </template>
          <template v-if="lazy_progress" v-slot:loader>
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </template>
        </vueper-slide>
        <template v-slot:pause>
          <v-icon>mdi-pause</v-icon>
        </template>
      </vueper-slides>
    </client-only>
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "SectionHomeSlider",

  provide: {
    theme: { isDark: true }
  },
  components: { VueperSlides, VueperSlide },

  data() {
    return {
      lazy_progress: true,

      pauseOnHover: true,
      autoPlaying: true,
      internalAutoPlaying: true,
      slides: [
        {
          id: "slide-1",
          title: "Projectos",
          content:
            "Quisque hac turpis tortor massa suscipit fringilla curae platea diam, erat hendrerit vivamus eros in vel est sodales, donec dis lacinia nam integer pellentesque netus duis.",
          image: "sliders/slider1.jpg",
         
        },
        {
          id: "slide-2",
          title: "Arrendar ou Comprar",
          content:
            "Luctus ligula faucibus rhoncus convallis lectus habitant nulla natoque tempus primis sed, dis tellus enim consequat aliquam ultrices neque fusce risus bibendum",
          image: "sliders/slider2.jpg",
         
        }
      ]
    };
  }
};
</script>

<style lang="css">
.vueperslides__arrow {
  color: #02636f;
}
</style>
