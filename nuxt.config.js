import colors from "vuetify/es5/util/colors";

export default {
  mode: "universal",

  target: "server",

  head: {
    titleTemplate: "%s - Zurconstroi",
    title: "Zurconstroi",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  css: ["@/assets/styles/main.css"],

  pageTransition: {
    name: "fade",
    mode: "out-in"
  },

  plugins: [
    "@/plugins/base",
    "@/plugins/veevalidate",
    "@/plugins/axios",
    "@/mixins/user",
    "@/mixins/validationErrors",
    "@/mixins/utils",
    "@/mixins/goToPage"
  ],

  components: true,

  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/moment"],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    [
      "vue-sweetalert2/nuxt",
      {
        confirmButtonColor: "#02636F",
        cancelButtonColor: "#ff7674"
      }
    ]
  ],

  axios: {
    baseURL: "http://zurc_api.test:8000/api"
  },

  router: {
    middleware: ["clearValidationFormErrors"]
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
            propertyName: "meta.token"
          },
          logout: { url: "auth/logout", method: "post" },
          user: { url: "auth/user", method: "get", propertyName: "data" }
        }
      }
    }
  },

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#02636F",
          accent: colors.grey.darken3,
          secondary: "#479096",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.darken1
        },
        light: {
          primary: "#02636F",
          accent: colors.grey.darken3,
          secondary: "#479096",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.darken1
        }
      }
    }
  },
  moment: {
    timezone: true,
    locales: ["pt"],
    defaultTimezone: "Atlantic/Cape_Verde"
  },

  build: {}
};
