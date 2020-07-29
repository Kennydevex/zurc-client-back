<template>
  <v-container grid-list-xl fluid>
    <v-layout>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-facebook"
          title="100+"
          sub-title="Likes"
          color="indigo"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-google"
          title="150+"
          sub-title="Connections"
          color="red"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-twitter"
          title="200+"
          sub-title="Followers"
          color="light-blue"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="fa fa-instagram"
          title="50+"
          sub-title="Shots"
          color="purple"
        >
        </mini-statistic>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MiniStatistic from "@/components/backend/widgets/MiniStatistic";

export default {
  layout: "backend",
  components: {
    MiniStatistic
  }
};
</script>
