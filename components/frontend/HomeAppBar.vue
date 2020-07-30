<template>
  <div>
    <v-app-bar id="home-app-bar" app color="white" elevation="1" height="100">
      <!--<img
        :src="'logo.png'"
        class="mr-3 hidden-xs-only"
        contain
        max-width="52"
        
      />

      <img :src="'logo.png'" contain max-width="10"  />-->

      <base-img
        :src="'zurconstroi.jpeg'"
        class="mr-3 hidden-xs-only"
        contain
        max-width="120"
        width="100%"
      />

      <!--<base-img :src="'logo.png'" contain max-width="128" width="100%" />-->

      <v-spacer />

      <div>
        <v-tabs class="hidden-sm-and-down" optional>
          <v-tab
            v-for="(name, i) in items"
            :key="i"
            :exact="name === 'Home'"
            :ripple="false"
            :to="{ name: name == 'Home' ? 'index' : name }"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >
            {{ name }}
          </v-tab>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
    </v-app-bar>

    <home-drawer v-model="drawer" :items="items" />
  </div>
</template>

<script>
export default {
  name: "HomeAppBar",

  components: {
    HomeDrawer: () => import("./HomeDrawer")
  },

  data: () => ({
    drawer: null,
    items: ["Home", "about", "properties", "services", "contacts"]
  })
};
</script>

<style lang="stylus">
#home-app-bar
  .v-tabs-slider
    max-width: 24px
    margin: 0 auto

  .v-tab
    &::before
      display: none
</style>
