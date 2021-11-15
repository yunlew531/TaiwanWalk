export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'taiwan-walk',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://fonts.googleapis.com/css2?family=Material+Icons', rel: 'stylesheet' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'swiper/css',
    'swiper/css/pagination',
    'swiper/css/navigation',
    'simplebar/dist/simplebar.min.css',
    '@/assets/styleSheets/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-awesome-swiper', ssr: false },
    { src: '~/plugins/simple-bar', ssr: false },
    { src: '~/plugins/getRandom', ssr: true },
    { src: '~/plugins/axios', ssr: true },
    { src: '~/plugins/translateCity', ssr: true },
    { src: '~/plugins/filterHasImgs', ssr: true },
    { src: '~/plugins/calcPage', ssr: true },
  ],

  env: {
    TRX_ID: process.env.TRX_ID,
    TRX_KEY: process.env.TRX_KEY,
    TRX_URL: process.env.TRX_URL
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dayjs'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.TRX_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true
  }
}
