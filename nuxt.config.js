export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Smart Parking System',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
            // { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' }]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        // 'view-design/dist/styles/iview.css',
        '~/assets/theme/app.less'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/view-ui',
        '@/plugins/axios',
        '@/plugins/api',
        '@/plugins/vue-echarts',
        '@/plugins/event-bus'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',

        '@nuxtjs/composition-api/module'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://go.nuxtjs.dev/content
        '@nuxt/content'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.BASE_API_URL || 'http://localhost:8000',
        browserBaseURL: process.env.BASE_API_URL || 'http://localhost:8000'
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            name: 'Smart Parking System',
            lang: 'vi'
        }
    },

    // Loading
    loading: {
        color: 'DodgerBlue',
        height: '5px',
        continuous: true,
        duration: 3000
    },

    loadingIndicator: {
        name: 'circle',
        color: '#3B8070',
        background: 'white'
    },

    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        loaders: {
            less: {
                implementation: require('less'),
                javascriptEnabled: true
            }
        }
    },

    env: {
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
        baseApiUrl: process.env.BASE_API_URL || 'http://localhost:8000'
    }
}
