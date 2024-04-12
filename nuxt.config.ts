// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'pathe';

export default defineNuxtConfig({
  // runtimeConfig: {
  //   auth0: {
  //     clientId: 'nPmYz3aF4bChYOTT11JxtAsQFm2NS6EX',
  //     clientSecret: '0mjRrh2yqlrK1Sg90dOHkem-rKIffNrjopIoI_AhpAVybqdIl7KywlI8C8p7iq4S',
  //     issuer: 'dev-oes55s56ln5dkwf8.eu.auth0.com'
  //   }
  // },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  //@sidebase/nuxt-auth'
  // auth: {
  //   provider: {
  //     type: 'authjs'
  //   }
  // },
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
  },
  routeRules: {
    '/api/**': {
      cors: true,
    },
  },
})