// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'pathe';

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@vueuse/nuxt',],
  colorMode: {
    preference: 'light',
    classSuffix: ''
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})
