<template>
  <section id="home-slider">
    <client-only placeholder="Loading...">
      <vueper-slides
        :slide-ratio="1 / 2"
        fixed-height="600px"
        lazy
        lazy-load-on-drag
        fade
        ref="myVueperSlides"
        autoplay
        :pause-on-hover="pauseOnHover"
        @autoplay-pause="internalAutoPlaying = false"
        @autoplay-resume="internalAutoPlaying = true"
      >
        <vueper-slide
          v-for="slide in slides"
          :key="slide.id"
          :title="slide.title"
          :image="slide.image"
        >
          <template v-slot:content>
            <v-container class="fill-height">
              <v-responsive
                class="d-flex align-center"
                max-width="500"
                width="100%"
              >
                <base-heading title="ZURCONSTROI WEB APP" />

                <base-body>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                  temporibus, sequi adipisci fugiat ipsum quis sunt, quia
                  nostrum quas voluptates omnis, quod optio aperiam? Ad nesciunt
                  modi doloremque dolore ipsam?
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

                  <!--<span class="font-weight-bold ml-6 mr-4 my-4">or</span>

            <base-btn :ripple="false" class="pa-1" height="auto" text>
              Get Started Now
            </base-btn>-->
                </div>
              </v-responsive>
            </v-container>
          </template>
          <template v-slot:loader>
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
      breakpoints: {
        1200: {
          slideRatio: 1 / 2
        },
        900: {
          slideRatio: 1 / 3
        },
        600: {
          slideRatio: 1 / 2,
          arrows: false,
          bulletsOutside: true
        },
        // The order you list breakpoints does not matter, Vueper Slides will sort them for you.
        1100: {
          slideRatio: 1 / 4
        }
      },
      pauseOnHover: true,
      autoPlaying: true,
      internalAutoPlaying: true,
      slides: [
        {
          id: "slide-1",
          title: 'Slide <b style="font-size: 1.3em;color: yellow">#1</b>',
          content:
            'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: yellow">why not?</span>',
          image: "sliders/slider1.jpg"
        },
        {
          id: "slide-2",
          title: 'Slide <b style="font-size: 1.3em;color: yellow">#1</b>',
          content:
            'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: yellow">why not?</span>',
          image: "sliders/slider2.jpg"
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
