<template>
  <div>
    Facebook
    {{ face_data }}
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
    this.getFBApiStatus();
    this.getFBData();
  },

  data() {
    return {
      face_data: []
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
        });
      }
    },

    facebookLogin() {
      if (process.client) {
        Facebook.login().then(response => {
          if (response.status === "connected") {
            console.log("Login efetuado com sucesso");
          } else {
            console.log("Erro de authenticação");
          }
        });
      }
    },

    getFBApiStatus() {
      this.initFbApi().then(res => {
        Facebook.getLoginStatus().then(response => {
          if (response.status === "connected") {
            console.log("connected");
          } else {
            this.facebookLogin();
          }
        });
      });
    },

    getFBData() {
      this.initFbApi().then(res => {
        Facebook.api("/me", "get", {
          fields: "name"
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
