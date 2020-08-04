// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";
import { mapGetters } from "vuex";

const ACL = {
  install(Vue, options) {
    Vue.mixin({
      // async created() {
      //   const { data: permissions } = await this.$axios.get(
      //     "laravel-permissions"
      //   );
      //   const { data: roles } = await this.$axios.get("laravel-roles");
      //   this.$laravel.setPermissions(permissions);
      //   this.$laravel.setRoles(roles);
      // }

      methods: {
        async laravelPermissions() {
          const { data: permissions } = await this.$axios.get(
            "laravel-permissions"
          );
          const { data: roles } = await this.$axios.get("laravel-roles");
          this.$laravel.setPermissions(permissions);
          this.$laravel.setRoles(roles);
        }
      }
    });
  }
};

Vue.use(ACL);
