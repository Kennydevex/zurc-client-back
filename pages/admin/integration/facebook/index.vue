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
    // this.getFBApiStatus();
    this.getFBData();
  },

  data() {
    return {
      face_data: [],
      access_token: ""
    };
  },

  methods: {
    async initFbApi() {
      if (process.client) {
        await Facebook.load().then(() => {
          Facebook.init({
            appId: "308842333710659",
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true,
            version: "v8.0"
          });

          // this.facebookLogin();

          // Facebook.getLoginStatus().then(response => {
          //   // this.facebookLogin();

          //   if (response.status === "connected") {
          //     this.$data.access_token = response.authResponse.accessToken;
          //     console.log("connected");
          //     console.log(response);
          //   } else {
          //     console.log(response);

          //     this.facebookLogin();
          //   }
          // });
        });
      }
    },

    // getFBApiStatus() {
    //   this.initFbApi().then(res => {
    //     Facebook.getLoginStatus().then(response => {
    //       if (response.status === "connected") {
    //         console.log("connected");
    //       } else {
    //         this.facebookLogin();
    //       }
    //     });
    //   });
    // },

    // facebookLogin() {
    //   if (process.client) {
    //     Facebook.login().then(response => {
    //       if (response.status === "connected") {
    //         this.$data.access_token = response.authResponse.accessToken;
    //       } else {
    //         console.log("Erro de authenticação");
    //       }
    //     });
    //   }
    // },

    getFBData() {
      this.initFbApi().then(res => {
        console.log("o tken ta aqy" + this.$data.access_token);
        Facebook.api("/me", "get", {
          fields: "name",
          access_token: 'EAAEY4ZCWXqUMBALztFqxbW5WqI7cocPxNY8NUopbUEsFq5ybayEsgWBjIgrnLIKvjeh79WNN9ViJisZBDVNTtRCPi4DnzGIq7UuDG2eUQVDe6sTVqnUE7dZCzY1Y7xwlsiMhDaQO0ichyoyaO2y0GCk0LiZBaq07Sje4X7fpjkT06nfJQ65g6iZAVWcttPOxMW3jqLSyQqQZDZD'
          // access_token: this.$data.access_token
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
