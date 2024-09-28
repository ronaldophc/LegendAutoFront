// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  modules: ['nuxt-auth-sanctum', '@nuxt/ui', '@nuxt/icon', '@nuxtjs/tailwindcss', 'nuxt-snackbar'],
  sanctum: {
    baseUrl: 'http://localhost:8001',
    mode: 'token',
    redirectIfAuthenticated: false,
    redirectIfUnauthenticated: false,
    endpoints: {
      login: '/api/users/login',
      logout: '/api/users/logout',
      user: '/api/user',
    },
    redirect: {
      keepRequestedRoute: false,
      onLogin: '/meusite/settings', // After login
      onLogout: '/meusite', // After logout
      onAuthOnly: '/meusite', // Route to redirect to when user has to be authenticated. If set to false, do nothing
      onGuestOnly: '/', // Route to redirect to when user has to be a guest. If set to false, do nothing
    },
    client: {
      initialRequest: true,
    },
    globalMiddleware: {
      enabled: true,
      allow404WithoutAuth: false
    }
  },
  colorMode: {
    preference: 'light'
  },
  css: [
    '~/assets/scss/main.scss'
  ],
  snackbar: {
    bottom: true,
    left: true,
    duration: 5000
  }
})