import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

const ColetakiPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e6f2f4', 100: '#c1dee2', 200: '#98c8cf', 300: '#6eb2bc',
      400: '#4fa1ad', 500: '#0a6e7c', 600: '#075560', 700: '#054048',
      800: '#032d33', 900: '#011a1e', 950: '#000d0f'
    }
  }
})

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  ssr: true,
  nitro: { preset: 'static' },
  modules: ['@primevue/nuxt-module'],
  css: ['primeicons/primeicons.css', '~/assets/css/main.css'],
  primevue: {
    options: {
      theme: {
        preset: ColetakiPreset,
        options: { darkModeSelector: '.dark-mode', cssLayer: false }
      }
    }
  },
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Coletaki — Climate-tech para gestão de resíduos sólidos urbanos',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { name: 'description', content: 'Plataforma GIS climate-tech para gestão sustentável de resíduos sólidos urbanos no Brasil' },
        { property: 'og:title', content: 'Coletaki' },
        { property: 'og:description', content: 'Climate-tech para gestão de resíduos no Brasil' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.coletaki.eco.br' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap' }
      ]
    }
  }
})
