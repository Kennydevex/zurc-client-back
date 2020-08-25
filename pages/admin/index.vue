<template>
  <v-container grid-list-xl fluid>
    <v-row>
      <template v-for="(social_data, s) in socials_data">
        <v-col cols="12" lg="3" md="6" :key="s">
          <mini-statistic
            :icon="social_data.icon"
            :title="social_data.title"
            :sub-title="social_data.sub_title"
            :color="social_data.color"
          >
          </mini-statistic>
        </v-col>
      </template>
    </v-row>

    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" md="8">
        <GuestMessages :messages="messages" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  layout: "backend",
  components: {
    MiniStatistic: () => import("@/components/backend/widgets/MiniStatistic"),
    GuestMessages: () => import("@/components/backend/messages/GuestMessages")
  },

  // async asyncData({ $axios }) {
  //   let { data } = await $axios.$get("get-messages");
  //   return { messages: data };
  // },

  async fetch({ store }) {
    await store.dispatch("dashboard/getGuestMessages");
  },

  computed: {
    ...mapGetters({ messages: "dashboard/messages" }),
    socials_data() {
      return [
        {
          icon: "mdi-facebook",
          title: "200+",
          sub_title: "Seguidores",
          color: "indigo"
        },
        {
          icon: "mdi-twitter",
          title: "200+",
          sub_title: "Seguidores",
          color: "light-blue"
        },
        {
          icon: "mdi-google",
          title: "200+",
          sub_title: "Seguidores",
          color: "red"
        },
        {
          icon: "mdi-instagram",
          title: "200+",
          sub_title: "Seguidores",
          color: "purple"
        }
      ];
    }
  },

  methods: {
    async getGuestMessages() {
      await this.$store.dispatch("dashboard/getGuestMessages");
    }
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_MESSAGES_DATA", () => {
        this.getGuestMessages();
      });
    }
  }

  // created() {
  //   // this.myFacebookData();
  // }

  // methods: {
  //   async myFacebookData() {
  //     await FB.api("/me", "GET", {}, function(response) {
  //       // Insert your code here
  //     });
  //   }
  // }
};
</script>
