import type {NuxtConfig} from '@nuxt/types'
// @ts-ignore
import colors from 'vuetify/es5/util/colors'

const config: NuxtConfig = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ronnie.link',
    title: 'URL Shortener',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: "description",
        name: "description",
        content: "Private URL Shortener by RonnieCodes.com"
      },
      { name: 'format-detection', content: 'telephone=no' },

      {
        hid: "og:url",
        property: "og:url",
        content: "https://ronnie.link"
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Private URL Shortener by RonnieCodes.com"
      },

      { name: "twitter:site", content: "@TheCodingNuke" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        hid: "twitter:url",
        name: "twitter:url",
        content: "https://ronnie.link",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "Private URL Shortener by RonnieCodes.com"
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/potato4d/nuxt-client-init-module
    'nuxt-client-init-module'
  ],

  serverMiddleware: [
    {
      path: '/api',
      handler: '~/api'
    }
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : '/api'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}


export default config;