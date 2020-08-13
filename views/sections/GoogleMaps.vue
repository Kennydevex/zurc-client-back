<template>
  <base-section id="map" space="0">
    <v-row v-if="properties.length == 0">
      <v-col cols="12" class="pa-0">
        <v-skeleton-loader
          loading
          class="mx-auto"
          type="image"
          max-height="500"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else align="center" justify="center">
      <gmap-map :center="center" :map-type-id="mapTypeId" :zoom="7.5">
        <template v-for="(item, index) in properties">
          <div :key="index">
            <gmap-marker
              :position="item.location.geo"
              @click="goToProperty(item.slug)"
            />

            <!--<gmap-info-window
              v-if="info_window[item.id]"
              :position="item.location.geo"
            >
              yes
            </gmap-info-window>-->
          </div>
        </template>
      </gmap-map>
    </v-row>
  </base-section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SectionGoogleMaps",
  provide: {
    heading: { align: "center" }
  },

  computed: {
    ...mapGetters({ properties: "properties/actived_properties" })
  },

  data() {
    return {
      center: { lat: 16, lng: -24 },
      mapTypeId: "terrain",
      info_window: {}
    };
  },

  methods: {
    goToProperty(slug) {
      this.$router.push({
        name: "properties-ver-slug",
        params: { slug: slug }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.vue-map-container
  height: 450px
  // max-width 900px
  width: 100%
</style>
