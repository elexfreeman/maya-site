// Nuxt 3 configuration
export default defineNuxtConfig({
  css: [
    // Keep existing global styles as-is
    '~/style.css'
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bad+Script&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap' }
      ]
    }
  },
  compatibilityDate: '2024-08-21'
})
