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
            v-for="menu in menus"
            :key="menu.id"
            :ripple="false"
            @click="frontNavegation(menu.link)"
            :exact="menu.link === '/'"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
            nuxt
          >
            {{ menu.name }}
          </v-tab>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
    </v-app-bar>

    <home-drawer v-model="drawer" :menus="menus" />
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
    items: ["Home", "About", "properties", "services", "contacts"],
    menus: [
      { id: 1, name: "Home", link: "/" },
      { id: 2, name: "About", link: "/about" },
      { id: 3, name: "Properties", link: "/properties" },
      { id: 4, name: "Services", link: "/services" },
      { id: 5, name: "Contacts", link: "/contacts" }
    ]
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
