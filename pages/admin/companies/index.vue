<template>
  <v-container grid-list-xs fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card max-width="600">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>

          <v-card-title>
            Top western road trips
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="primary">
              Editar
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than
                he could deliver. You won't have time for sleeping, soldier, not
                with all the bed making you'll be doing. Then we'll go with that
                data file! Hey, you add a one and two zeros to that or we walk!
                You're going to do his laundry? I've got to find a way to
                escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card-text class="company-action">
          <v-fab-transition>
            <v-btn nuxt :to="{name: 'admin-companies-create'}" color="pink" dark absolute bottom right fab>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: "backend",
  middleware: "auth",

  data() {
    return {
      show: false
    };
  }
};
</script>

<style lang="stylus" scoped>
#company-action-action
  position: fixed
  z-index: 100
  bottom: 20px
</style>
