<script>
// Extensions
import View from "@/views/View";

// Mixins
import LoadSections from "@/mixins/load-sections";
// import Measurable from "vuetify/lib/mixins/measurable";
export default {
  layout: "frontend",
  name: "ServicePageHeader",

  head() {
    return {
      title: "Serviços",
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

  // metaInfo: { title: "About Us" },

  extends: View,

  mixins: [LoadSections(["ServicePageHeader", "AllServices", "HomeFooter"])],

  props: {
    id: {
      type: String,
      default: "services"
    }
  }
};
</script>
