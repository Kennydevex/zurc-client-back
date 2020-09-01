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
      <template v-for="menu in menus">
        <v-list-group :key="menu.id" v-if="menu.submenu">
          <template v-slot:activator>
            <v-list-item-title>{{ menu.name }}</v-list-item-title>
          </template>

          <template v-for="(submenu, i) in menu.submenu">
            <v-divider inset :key="i" v-if="submenu.divider"></v-divider>
            <v-list-item
              v-else
              class="ml-6"
              :key="i"
              @click="frontNavegation(submenu.link)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ submenu.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  submenu.description || ""
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-group>

        <v-list-item
          v-else
          :key="menu.id"
          @click="frontNavegation(menu.link)"
          :exact="menu.name === 'Home'"
          color="primary"
        >
          <v-list-item-content>
            <v-list-item-title class="text-capitalize" v-text="menu.name" />
          </v-list-item-content>
        </v-list-item>
      </template>
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
  },

  data() {
    return {
      admins: [
        ["Management", "people_outline"],
        ["Settings", "settings"]
      ],
      cruds: [
        ["Create", "add"],
        ["Read", "insert_drive_file"],
        ["Update", "update"],
        ["Delete", "delete"]
      ]
    };
  }
};
</script>
