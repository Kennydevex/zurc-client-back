<template>
 <v-container grid-list-xl fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card>
          <v-card-title primary-title class="font-weight-regular primary--text">
            Editar registo da empresa
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <company-form :formData="formData" :creating="false"></company-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
 
</template>

<script>
export default {
  name: "EditCompany",
  layout: "backend",
  middleware: "auth",

  components: {
    CompanyForm: () => import("@/components/backend/forms/CompanyForm")
  },

  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/companies/${params.slug}`);
    return { formData: data };
  },

  data() {
    return {
      formData: {
        id: "",
        name: "Zurconstroi",
        about: "",
        slug: "",
        released: "",
        nif: "",
        logo: "",
        color: "#02636F",

        contacts: [
          {
            id: "",
            contact: "",
            description: "",
            type: "1"
          }
        ],

        location: {
          id: "",
          state: "São Vivente",
          city: "Mindelo",
          zone: "Morada",
          postcode: "7100",
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
