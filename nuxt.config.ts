// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  // @ts-ignore
  css: [
    '@/assets/css/styles.css'
  ],
  modules: [
    '@pinia/nuxt',
  ],
})
