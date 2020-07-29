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

  transition: {
    name: "fade",
    mode: "out-in"
  },

  plugins: [],

  components: true,

  buildModules: ["@nuxtjs/vuetify"],

  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],

  axios: {},

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

  build: {}
};
