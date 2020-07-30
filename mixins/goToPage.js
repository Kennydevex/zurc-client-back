// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";

const redirectPage = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        redirectToPage(page) {
          this.$router.push({ path: "/" + page });
        }
      }
    });
  }
};

Vue.use(redirectPage);
