// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'pathe';

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss'],
  colorMode: {
    preference: 'light'
  }
})
