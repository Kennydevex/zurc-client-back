<script>
// Extensions
import View from "@/views/View";

// Mixins
import LoadSections from "@/mixins/load-sections";

export default {
  layout: "frontend",
  name: "index",
 
 

  extends: View,

  mixins: [
    LoadSections([
      "home-caroucel",
      // "home-slider",
      "home-services",
      "home-guidelines",
      // "contact-us",
      // "affiliates",
      // "social-media",
      "home-featured-properties",
      "principal-contacts",
      // "newsletter",
      // "pro-features",
      // "GoogleMaps",
      "home-footer"
    ])
  ],

  props: {
    id: {
      type: String,
      default: "home"
    }
  }
};
</script>
