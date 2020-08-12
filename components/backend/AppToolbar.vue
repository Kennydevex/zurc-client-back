<template>
  <div>
    <v-app-bar :clipped-left="clipped" fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="toggleDrawer()" />

      <v-btn icon @click="toggleClipped()">
        <v-icon>mdi-window-maximize</v-icon>
      </v-btn>

      <v-spacer />

      <v-btn icon @click="handleFullScreen()">
        <v-icon>mdi-overscan</v-icon>
      </v-btn>

      <v-btn icon text>
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>mdi-bell</v-icon>
        </v-badge>
      </v-btn>

      <v-menu
        rounded="b-xl"
        offset-y
        origin="center center"
        :nudge-right="140"
        :nudge-bottom="10"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text icon color="primary">
            <v-avatar size="28px">
              <img src="/users/default.png" alt="User Avatar" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item @click.stop="handleLogout()">
              <v-list-item-icon>
                <v-icon>mdi-at</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Meu Perfil</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item nuxt to="/" :ripple="false">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Principal</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item @click.stop="handleLogout()" :ripple="false">
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Terminr Sessão</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import Util from "@/util";
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      title: "Zurconstroi"
    };
  },

  computed: {
    miniVariant: {
      get() {
        return this.$store.state.application.miniVariant;
      },
      set(val) {
        this.$store.commit("application/miniVariant", val);
      }
    },
    clipped: {
      get() {
        return this.$store.state.application.clipped;
      },
      set(val) {
        this.$store.commit("application/clipped", val);
      }
    }
  },

  methods: {
    toggleDrawer() {
      this.$store.commit("application/toggleDrawer");
    },
    toggleClipped() {
      this.$store.commit("application/toggleClipped");
    },
    toggleMiniVariant() {
      this.$store.commit("application/toggleMiniVariant");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    handleLogout() {
      this.$router.push("/login");
    }
  }
};
</script>
