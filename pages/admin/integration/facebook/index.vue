<template>
  <div>
    Facebook
    {{ face_perfil }}
  </div>
</template>

<script>
import * as Facebook from "fb-sdk-wrapper";

export default {
  name: "FacebookIntegration",
  layout: "backend",
  //   appID: 316013626184538

  created() {
    if (process.client) {
      Facebook.load().then(() => {
        Facebook.init({
          appId: "316013626184538",
          version: "v8.0"
        });
        this.myfacebiik();
      });
    }
  },

  data() {
    return {
      face_perfil: []
    };
  },

  methods: {
    async myfacebiik() {
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

      Facebook.api("/700714477192789", "get", {
        fields: "name"
      }).then(response => {
        console.log(response);
        // data's here!
        this.$data.face_perfil = res;
      });

      //  .$get(
      //   "https://graph.facebook.com/v8.0/me?fields=id%2Cname&access_token=EAAEfaafu01oBAD72KNq6r4uTvImZBopZCgIFhzJUnWgYDaw8FiyduLzrZBkHpHpNKSdIcEE0HIa0naGKqXDtC7hzjuC0q1EVyZAi4bD8EXWfWKMDp3P65Q0yWUFw3xpJiVyPdRhETGf274F2TqEZB1kGosSkrZCyLGzLkzRp6TnXArJNrd5pBkxJZC8jq7ZBMwwZD"
      // )
    }
  }
};
</script>

<style lang="scss" scoped></style>
