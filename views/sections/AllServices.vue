<template>
  <base-section id="home-services" space="40">
    <!--<base-section-heading title="Valores">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in!
      Asperiores, impedit libero. Veniam rerum saepe unde nihil possimus
      quibusdam esse accusamus mollitia magni fuga.
    </base-section-heading>-->

    <v-container>
      <v-row>
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

  computed: {
    ...mapGetters({ services: "services/services" })
  }
};
</script>
