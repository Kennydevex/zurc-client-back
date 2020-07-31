// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";

const handleForms = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        resetForm() {
          this.$refs.form.reset();
        },
      }
    });
  }
};

Vue.use(handleForms);
