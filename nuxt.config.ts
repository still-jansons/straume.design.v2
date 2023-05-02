// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // @ts-ignore
    modules: [
        '@nuxtjs/i18n',
        '@nuxtjs/tailwindcss',
        '@nuxt/image-edge',
        '@nuxt/content'
    ],
    i18n: {
        customRoutes: 'config',   // disable custom route with page components
        pages: {
            "interiors": {
                en: '/interiors'
            },
            "philosophy": {
                en: '/philosophy'
            },
            "stories": {
                en: '/stories'
            },
            "contacts": {
                en: '/contacts'
            }
        },
        locales: [
            {
                name: 'ENG',
                code: 'en',
                iso : 'en-US',
                file : 'en-US.json'
            },
        ],
        lazy                 : false,
        langDir              : 'lang/',
        defaultLocale        : 'en',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',              // recommended
        }
    },
    image: {
        dir     : 'public',
        target  : 'static',
        provider: 'ipx'
    }
})
