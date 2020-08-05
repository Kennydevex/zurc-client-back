<template>
  <div>
    <google-maps></google-maps>
    <home-featured-properties></home-featured-properties>
  </div>
</template>

<script>
// import HomeFeaturedPropertiesVue from '~/views/sections/HomeFeaturedProperties.vue';
// Extensions
// import View from "@/views/View";

// Mixins
// import LoadSections from "@/mixins/load-sections";
// import Measurable from "vuetify/lib/mixins/measurable";
export default {
  layout: "frontend",
  name: "PropertiesPages",

  head() {
    return {
      title: "Properties",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  },

  components: {
    GoogleMaps: () => import("@/views/sections/GoogleMaps"),
    HomeFeaturedProperties: () => import("@/views/sections/HomeFeaturedProperties")
  }

  // mixins: [Measurable],

  // metaInfo: { title: "About Us" },

  // extends: View,

  // mixins: [LoadSections(["google-maps"])],

  // props: {
  //   id: {
  //     type: String,
  //     default: "properties"
  //   }
  // }
};
</script>
