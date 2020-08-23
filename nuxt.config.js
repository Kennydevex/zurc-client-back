// import colors from "vuetify/es5/util/colors";

export default {
  mode: "universal",

  target: "server",

  head: {
    titleTemplate: "%s - Zurconstroi",
    title: process.env.SITE_TITLE || "Zurconstroi",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.SITE_DESCRIPTION || "Intermediação Imobiliaria"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  env: {
    PUBLIC_URL: process.env.PUBLIC_URL || "https://zurconstroi.ml/api"
  },

  robots: {
    UserAgent: "*",
    Disallow: "/admin/*"
  },

  sitemap: {
    hostname: process.env.SITE_URL || "https://zurconstroi.ml",
    gzip: true,
    exclude: ["/admin/**"],
    routes: ["/properties"]
  },

  css: ["@/assets/styles/main.css", "view-design/dist/styles/iview.css"],

  loading: { color: "#3adced" },

  pageTransition: {
    name: "fade",
    mode: "out-in"
  },

  plugins: [
    "@/plugins/base",
    "@/mixins/user",
    "@/mixins/acl",
    "@/mixins/utils",
    "@/mixins/goToPage",
    "@/mixins/validationErrors",
    "@/plugins/axios",
    "@/plugins/v-mask",
    "@/plugins/veevalidate",
    "@/plugins/vue2-filters",
    "@/plugins/laravel-permissions",
    { src: "@/plugins/aos", ssr: false },
    { src: "@/plugins/vue2-google-maps", ssr: false }
  ],

  components: true,

  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/moment"],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "vue-social-sharing/nuxt",
    [
      "vue-sweetalert2/nuxt",
      { confirmButtonColor: "#02636F", cancelButtonColor: "#ff7674" }
    ],
    ["vue-scrollto/nuxt", { container: "body", duration: 500, easing: "ease" }],
    [
      "nuxt-social-meta",
      {
        url: process.env.SITE_URL || "https://zurconstroi.ml",
        title: process.env.SITE_TITLE || "Zurconstroi",
        site_name: process.env.SITE_NAME || "Zurconstroi",
        description:
          process.env.SITE_DESCRIPTION || "Intermediação Imobiliaria",
        img: process.env.SITE_LOGO || "/zurconstroi.jpeg",
        locale: "pt_PT",
        twitter: "@zurconstroi",
        twitter_card: "summary_large_image",
        themeColor: "#02636F"
      }
    ]
  ],

  axios: {
    baseURL: process.env.BASE_URL || "http://zurc_api.test:8000/api"
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
        },
        autoFetchUser: true
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
          accent: "#424242",
          secondary: "#479096",
          info: "#26A69A",
          warning: "#FFC107",
          error: "#DD2C00",
          success: "#43A047",
          compl_prim: "#6F0E02",
          compl_suss: "#2D6F02",
          compl_info: "#45026F"
        },
        light: {
          primary: "#02636F",
          accent: "#424242",
          secondary: "#479096",
          info: "#26A69A",
          warning: "#FFC107",
          error: "#DD2C00",
          success: "#43A047",
          compl_prim: "#6F0E02",
          compl_suss: "#2D6F02",
          compl_info: "#45026F"
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
