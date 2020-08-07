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
          <template v-for="menu in menus">
            <v-tab
              :key="menu.id"
              :ripple="false"
              @click="frontNavegation(menu.link)"
              :exact="menu.name === 'Home'"
              active-class="text--primary"
              class="font-weight-bold"
              min-width="96"
              text
              nuxt
            >
              {{ menu.name }}
            </v-tab>
          </template>
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
    menus: [
      { id: 1, name: "Início", link: "/" },
      { id: 3, name: "Proppridades", link: "/properties" },
      { id: 4, name: "Serviços", link: "/services", self: true },
      { id: 2, name: "Sobre nós", link: "/about" },
      { id: 5, name: "Contactos", link: "/contacts" }
      // {
      //   id: 6,
      //   name: "Outros",
      //   submenus: [
      //     { id: 7, name: "Sub-Outro", link: "/" },
      //     { id: 8, name: "Sub-Outter", link: "/about" }
      //   ]
      // }
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
