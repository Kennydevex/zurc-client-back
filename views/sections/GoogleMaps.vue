<template>
  <div>
    <client-only>
      <gmap-map :center="center" :map-type-id="mapTypeId" :zoom="7.5">
        <template v-for="(item, index) in properties">
          <div :key="index">
            <gmap-marker
              :position="item.location.geo"
              @click="goToProperty(item.slug)"
            />
              <!--:icon="markerOptions"-->

            <!--<gmap-info-window
              v-if="info_window[item.id]"
              :position="item.location.geo"
            >
              yes
            </gmap-info-window>-->
          </div>
        </template>
      </gmap-map>
    </client-only>
  </div>
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
      info_window: {},
      markerOptions: {
        url: "/app/marker.svg",
        size: { width: 60, height: 60, f: "px", b: "px" },
        scaledSize: { width: 30, height: 45, f: "px", b: "px" }
      }
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
  width: 100%
</style>
