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

  data: () => ({
    model: true
  })
};
</script>
