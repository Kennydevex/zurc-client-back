<template>
  <div>
    <property-form :formData="formData" :creating="false"></property-form>
  </div>
</template>

<script>
export default {
  name: "EditProperty",
  layout: "backend",
  middleware: "auth",

  components: {
    PropertyForm: () => import("@/components/backend/forms/PropertyForm")
  },

  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/properties/${params.slug}`);
    return { formData: data };
  },

  async fetch({ store }) {
    await store.dispatch("destinations/getDestinations");
  },

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
        price: 0,
        type: "",
        typology: "",
        leisure: "",
        dimension: "", // Em mt quadrado
        status: false,
        featured: false,
        galleries: [],
        destinations: [],
        cover: null,
        location: {
          id: "",
          state: "",
          city: "",
          zone: "",
          postcode: "",
          geo: {
            id: "",
            lat: null,
            lng: null
          }
        }
      }
    };
  }
};
</script>
