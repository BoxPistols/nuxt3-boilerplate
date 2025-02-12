import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  buildModules: ['@nuxt/typescript-build'],
  // auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  autoImport: {
    // custom component directory
    customComponents: '~/components',
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  srcDir: 'src',
  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  trailingSlash: false,

  app: {
    baseURL: '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'ja',
      },
      title: 'My Awesome App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'My Awesome App description',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'My Awesome App',
        },
        { hid: 'og:title', property: 'og:title', content: 'My Awesome App' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Description of My Awesome App',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
        { hid: 'og:url', property: 'og:url', content: 'https://example.com' },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        { hid: 'twitter:site', name: 'twitter:site', content: '@username' },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content:
            'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  nitro: {
    preset: 'static',
  },
  ssr: false,

  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2024-12-15',
})
