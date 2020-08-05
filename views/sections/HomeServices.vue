<template>
  <base-section id="home-services" space="40">
    <!--<base-section-heading title="Valores">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in!
      Asperiores, impedit libero. Veniam rerum saepe unde nihil possimus
      quibusdam esse accusamus mollitia magni fuga.
    </base-section-heading>-->

    <v-container>
      <v-row>
        <v-col cols="12"
          ><base-section-heading title="Serviços"></base-section-heading
        ></v-col>
        <v-col v-for="(service, i) in services" :key="i" cols="12" md="4">
          <base-card-service v-bind="service" align="left" horizontal>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            illum veniam cum dolores ratione commodi beatae quas maxime,
            laboriosam excepturi solut!
          </base-card-service>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SectionThemeFeatures",

  async created() {
    await this.$store.dispatch("services/getServices");
  },

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
