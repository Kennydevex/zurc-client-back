<template>
  <v-system-bar v-if="model" app color="primary" class="px-4" dark height="40">
    <!--<a
      class="d-flex align-center"
      href="https://vuetifyjs.com/?ref=vtyd-pro-demo-system-bar"
      target="_blank"
    >
      <v-img
        alt="Vuetify Logo"
        class="mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        width="32"
      />

      <v-img
        alt="Vuetify Name"
        class="hidden-xs-only"
        contain
        width="96"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
      />
    </a>-->
    <v-btn class="text-none font-weight-regular" text nuxt dark
      >Zurconstroi</v-btn
    >
    <v-divider class="ml-6 mr-3" vertical />
    <v-btn color="white" text x-small class="text-none"
      >zurconstroi@gmail.com</v-btn
    >|
    <v-btn color="white" text x-small class="text-none">9178599</v-btn>
    <v-spacer />
    <template v-if="!authenticated">
      <v-btn
        class="text-capitalize subtitle-2 font-weight-light"
        color="white"
        small
        nuxt
        text
        to="/login"
        icon
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </template>

    <template v-else>
      <v-menu
        rounded="0"
        v-model="menu"
        :close-on-content-click="false"
        offset-y
        origin="center center"
        :nudge-right="140"
        :nudge-bottom="6"
        transition="scale-transition"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="text-capitalize subtitle-2 font-weight-light"
            color="white"
            small
            text
            dark
            v-bind="attrs"
            v-on="on"
          >
            {{ user.username }}
          </v-btn>
        </template>

        <v-card tile width="300">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="Usrr avatar"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ user.person.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn @click.prevent="logout()" icon class="primary--text">
                  <v-icon>mdi-logout</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list color="white" class="pa-0 ma-0">
            <v-list-item @click="">
              <v-list-item-title
                ><v-icon>mdi-account</v-icon> Perfil</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="redirectToPage('admin')">
              <v-list-item-title
                ><v-icon>mdi-view-dashboard</v-icon>
                Dashboard</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click.prevent="logout()">
              <v-list-item-title
                ><v-icon>mdi-logout</v-icon> Terminar Sessão</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>

    <v-divider class="ml-6 mr-3" vertical />

    <v-btn
      class="text-capitalize grey--text mr-n2 mr-sm-n1"
      small
      text
      @click="model = false"
    >
      <v-icon color="white" :left="$vuetify.breakpoint.smAndUp">
        mdi-close
      </v-icon>

      <span class="hidden-xs-only">
        Fechar Area
      </span>
    </v-btn>
  </v-system-bar>
</template>

<script>
export default {
  name: "HomeSystemBar",

  data() {
    return {
      model: true,
      menu: false
    };
  },

  methods: {
    async logout() {
      try {
        await this.$auth.logout();
      } catch (error) {}
    }
  }
};
</script>
