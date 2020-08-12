<script>
// Extensions
import View from "@/views/View";

// Mixins
import LoadSections from "@/mixins/load-sections";
// import Measurable from "vuetify/lib/mixins/measurable";
export default {
  layout: "frontend",
  name: "AboutPage",

  head() {
    return {
      title: "Sobre",
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

  // mixins: [Measurable],

  extends: View,

  mixins: [
    LoadSections([
      "about-page-header",
      "about-company",
      "HomeFooter"
    ])
  ],

  props: {
    id: {
      type: String,
      default: "about"
    }
  }
};
</script>
