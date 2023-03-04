// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        'nuxt-icon',
        '@nuxt/content',
        '@vueuse/nuxt',
        'nuxt-windicss',
    ],
    vueuse: {
        ssrHandlers: true,
    },
    windicss: {
        analyze: {
            analysis: {
                interpretUtilities: false,
            },
            server: {
                port: 4000,
                open: false,
            },
        },
        scan: true,
    },
    content: {
        markdown: {
            mdc: true,
        },
        highlight: {
            theme: 'github-dark',
        },
    },
})
