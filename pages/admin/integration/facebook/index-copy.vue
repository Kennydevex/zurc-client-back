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
        // Facebook.login({
        //   scope: "public_profile,name,email,user_friends",
        //   return_scopes: true
        // }).then(response => {
        //   if (response.status === "connected") {
        //     console.log("em login----" + response);
        //   } else {
        //     console.log("em login----" + response);
        //   }
        // });
      }
    },

    myfacebookReal() {
      this.initFbApi().then(res => {
        Facebook.api("/me", "get", {
          fields: "name",
          access_token:
            "EAAEfaafu01oBAB1dFzZBS32E7R9ZCARHlKFh9yJWYXIlwkpnAFDFO7sQuZAjYuTClpHHV8bOs34EFvmFuYu4EwJu0KWzzIZCGSkQqy9iwW8hOhg8u89sZBN3mmZCaNMUsoQIoskReCTqZBz0YRIXsePfUnm6ZBZBY1OpeAVBoqnV6Wci07U6kBTyiFGvGf7kz1qmyFQGDigL8qh91ZBEGfbx20T6W35AEaVXGR18D1rbwH2QZDZD"
        }).then(response => {
          console.log(response);
          this.face_data = response;
        });
      });
    },

    myfacebook() {
      //   await this.$axios
      //     .$get(`${this.graphQlUrl}/me`, {
      //       params: {
      //         fields: "first_name,name,id",
      //         access_token: this.facekookAccessToken
      //       }
      //     })
      //     .then(res => {
      //       this.$data.face_perfil = res;
      //     });

      if (process.client) {
        Facebook.api("/316013626184538", "get", {
          fields: "name"
        })
          .then(response => {
            console.log(response);
            // data's here!
            // this.$data.face_perfil = res;
          })
          .catch(err => {
            console.log(err);
          });

        //  .$get(
        //   "https://graph.facebook.com/v8.0/me?fields=id%2Cname&access_token=EAAEfaafu01oBAD72KNq6r4uTvImZBopZCgIFhzJUnWgYDaw8FiyduLzrZBkHpHpNKSdIcEE0HIa0naGKqXDtC7hzjuC0q1EVyZAi4bD8EXWfWKMDp3P65Q0yWUFw3xpJiVyPdRhETGf274F2TqEZB1kGosSkrZCyLGzLkzRp6TnXArJNrd5pBkxJZC8jq7ZBMwwZD"
        // )
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
