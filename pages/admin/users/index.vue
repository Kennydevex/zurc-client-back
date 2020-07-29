<template>
  <v-container grid-list-xl fluid>
    <v-layout>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-account-group"
          title="20"
          sub-title="Utilizadores"
          color="indigo"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-account-check"
          title="10"
          sub-title="Ativos"
          color="red"
        >
        </mini-statistic>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <mini-statistic
          icon="mdi-account-lock"
          title="5"
          sub-title="Inativos"
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
