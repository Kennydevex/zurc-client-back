// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";

const handleForms = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        resetForm() {
          this.$refs.form.reset();
        }
      },

      computed: {
        publicURL() {
          return process.env.PUBLIC_URL;
        },

        siteURL() {
          return process.env.SITE_URL;
        },

        facekookAccessToken() {
          return process.env.FACEBOOK_ACCESS_TOKEN;
        },

        graphQlUrl() {
          return process.env.GRAPH_QL_URL;
        }
      }
    });
  }
};

Vue.use(handleForms);
