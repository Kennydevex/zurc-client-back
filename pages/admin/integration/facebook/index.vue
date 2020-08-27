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
    initFbApi() {
      if (process.client) {
        Facebook.load().then(() => {
          Facebook.init({
            appId: "316013626184538"
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
};
</script>

<style lang="scss" scoped></style>
