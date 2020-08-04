<template>
  <v-navigation-drawer
    bottom
    color="transparent"
    fixed
    height="auto"
    overlay-color="secondary"
    overlay-opacity=".8"
    temporary
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list color="white" shaped>
      <v-list-item
        v-for="menu in menus"
        :key="menu.id"
        @click="frontNavegation(menu.link)"
        :exact="menu.name === 'Home'"
        color="primary"
      >
        <v-list-item-content>
          <v-list-item-title class="text-capitalize" v-text="menu.name" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "HomeDrawer",

  props: {
    menus: {
      type: Array,
      default: () => []
    }
  }
};
</script>
