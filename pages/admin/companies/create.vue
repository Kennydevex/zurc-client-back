<template>
  <v-container grid-list-xl fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card>
          <v-card-title primary-title class="font-weight-regular primary--text">
            Registo de empresa
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <company-form :formData="formData" :creating="true"></company-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CreateCompany",
  layout: "backend",
  middleware: "auth",

  components: {
    CompanyForm: () => import("@/components/backend/forms/CompanyForm")
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
