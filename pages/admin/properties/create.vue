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
    await store.dispatch("properties/getDestinations");
  },

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
        price: 0,
        type: "",
        dimension: "", // Em mt quadrado
        status: false,
        featured: false,
        destinations: [],
        location: {
          id: "",
          state: "",
          city: "",
          zone: "",
          postcode: "",
          geo: {
            id: "",
            lat: "",
            lng: ""
          }
        }
      }
    };
  }
};
</script>
