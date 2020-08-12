<template>
  <div>
    <property-form :formData="formData" :creating="true"></property-form>
  </div>
</template>

<script>
export default {
  name: "CreateCompany",
  layout: "backend",
  middleware: "auth",

  components: {
    PropertyForm: () => import("@/components/backend/forms/PropertyForm")
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
        price: "",
        type: "",
        typology: "",
        leisure: "",
        dimension: "", // Em mt quadrado
        status: false,
        featured: false,
        destinations: [],
        galleries: [],
        cover: null,
        location: {
          id: "",
          state: "",
          city: "",
          zone: "",
          postcode: "",
          geo: {
            id: "",
            lat: 0,
            lng: 0
          }
        }
      }
    };
  }
};
</script>
