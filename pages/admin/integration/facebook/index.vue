<template>
  <div>
    Facebook
    {{ face_perfil }}
  </div>
</template>

<script>
import * as Facebook from "fb-sdk-wrapper";
import loginVue from "~/pages/login.vue";

export default {
  name: "FacebookIntegration",
  layout: "backend",
  //   appID: 316013626184538

  created() {
    this.initFbApi();
    this.myfacebook();
  },

  data() {
    return {
      face_perfil: []
    };
  },

  methods: {
    async initFbApi() {
      if (process.client) {
        await Facebook.load().then(() => {
          Facebook.init({
            appId: "316013626184538",
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true
          });

          Facebook.getLoginStatus().then(response => {
            if (response.status === "connected") {
              console.log(response);
            } else {
              console.log(response);
            }
          });
        });
      }
    },

    myfacebook() {
      this.initFbApi().then(res => {
        Facebook.api("/700714477192789", "get", {
          fields: "name,  first_name"
        }).then(response => {
          console.log(response);
          this.face_data = response;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
