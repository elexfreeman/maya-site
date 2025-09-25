// Nuxt 3 configuration
export default defineNuxtConfig({
  css: [
    // Keep existing global styles as-is
    '~/style.css'
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'ru' }
    }
  },
  compatibilityDate: '2024-08-21'
})

