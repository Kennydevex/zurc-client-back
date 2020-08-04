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
      "hero",
      "theme-features",
      "GoogleMaps",
      "features",
      "contact-us",
      "keep-in-touch",
      "newsletter",
      "pro-features",
      "info",
      
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
