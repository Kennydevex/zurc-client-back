<template>
  <div id="appRoot">
    <template>
      <v-app dark id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar class="app--toolbar"></app-toolbar>

        <v-main>
          <page-header></page-header>
          <v-container fluid>
            <nuxt />
          </v-container>
        </v-main>
        <v-footer
          :absolute="!fixed"
          app
          height="auto"
          class="white pa-3 app--footer"
        >
          <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
          <v-spacer></v-spacer>
          <span class="caption mr-1"> By: Dicifra Kodigu </span>
        </v-footer>

        <app-fab></app-fab>

        <v-btn
          small
          fab
          dark
          text
          fixed
          top="top"
          right="right"
          class="setting-fab"
          color="red"
          @click="openThemeSettings"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
        >
          <theme-settings></theme-settings>
        </v-navigation-drawer>
      </v-app>
    </template>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark text @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import AppDrawer from "@/components/backend/AppDrawer";
import AppToolbar from "@/components/backend/AppToolbar";
import PageHeader from "@/components/backend/PageHeader";
import AppFab from "@/components/backend/AppFab";
import ThemeSettings from "@/components/backend/ThemeSettings";

export default {
  name: "BackendPage",
  middleware: ["auth"],
  head() {
    return {
      title: "ZurcAdmin",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  },

  created() {
    process.client ? (window.getApp = this) : "";
  },

  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings
  },
  data() {
    return {
      right: true,
      fixed: false,
      rightDrawer: false,
      expanded: true,
      snackbar: {
        show: false,
        text: "",
        color: ""
      }
    };
  },

  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0);
      this.rightDrawer = !this.rightDrawer;
    }
  }
};
</script>

<style lang="stylus" scoped>
.setting-fab
  top: 50% !important;
  right: 0;
  border-radius: 0

.page-wrapper
  min-height: calc(100vh - 64px - 50px - 81px);
  margin-bottom 50px;

.app--footer
  position absolute;
  bottom 0;
  width 100%;
</style>
