<template>
  <div>
    <v-app-bar id="home-app-bar" app color="white" elevation="1" height="100">
      <!--<img
        :src="'logo.png'"
        class="mr-3 hidden-xs-only"
        contain
        max-width="52"-->

      <!--<img :src="'/zurconstroi.jpeg'" contain max-width="2"  />-->

      <base-img
        :src="'/zurconstroi.jpeg'"
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
            <template v-if="menu.submenu">
              <v-menu
                :key="menu.id"
                origin="center center"
                transition="scale-transition"
                nudge-bottom="28"
                offset-y
                tile
                min-width="200"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-tab
                    active-class="text--primary"
                    class="font-weight-bold"
                    min-width="96"
                    :ripple="false"
                    text
                    nuxt
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ menu.name }}<v-icon>mdi-menu-down</v-icon>
                  </v-tab>
                </template>

                <v-list
                  class="pa-2"
                  color="white"
                  three-line
                  max-width="350"
                >
                  <template v-for="(submenu, index) in menu.submenu">
                    <v-divider
                      :key="index"
                      v-if="submenu.divider"
                      :inset="submenu.inset"
                    ></v-divider>
                    <v-list-item
                      v-else
                      nuxt
                      @click="frontNavegation(submenu.link)"
                      :key="index"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{
                          submenu.name
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          submenu.description || ""
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu>
            </template>

            <v-tab
              v-else
              :key="menu.id"
              :ripple="false"
              :to="menu.link"
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
// import { Dropdown, DropdownMenu, DropdownItem } from "view-design";

export default {
  name: "HomeAppBar",

  components: {
    HomeDrawer: () => import("./HomeDrawer")
    // Dropdown,
    // DropdownMenu,
    // DropdownItem
  },

  data: () => ({
    drawer: null,
    menus: [
      { id: 1, name: "Início", link: "/" },
      {
        id: 3,
        name: "Proppridades",
        submenu: [
          {
            id: 1,
            name: "Arrendar",
            description: "Caso queiras arrendar casa procura-a aqui",
            link: "/properties/arrendar"
          },
          { divider: true, inset: false },
          {
            id: 1,
            name: "Comprar",
            link: "/properties/comprar",
            description: "Apui podes comprar uma casa do seu gosto"
          },
          { divider: true, inset: false },
          {
            id: 1,
            name: "Permutar",
            link: "/properties/permutar",
            description:
              "Caso tenhas alguma propriedade que pretendes trocar podes lista-las aqui"
          }
        ]
      },
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
