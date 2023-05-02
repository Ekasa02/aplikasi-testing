export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Logibug',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],
  ssr: false,
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [


  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  axios: {
    baseURL: 'https://logibug.fly.dev/api/v1'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          register: { url: '/users', method: 'post' },
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: { url: '/logout', method: 'post' },
          activation: { url: '/user/user', method: 'get', propertyName: 'data' },
          getalluser: { url: '/users?q=ash', method: 'get', propertyName: 'user'}
        },
        tokenType: ''
      },
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
}
