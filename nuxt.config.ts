import {defineNuxtConfig} from 'nuxt/config'

export default defineNuxtConfig({
    ssr: false,
    devtools: {enabled: true},
    pages: true,
    modules: [
        'nuxt-auth-sanctum',
        '@nuxt/ui',
        '@nuxt/icon',
        '@nuxtjs/tailwindcss',
        'nuxt-snackbar',
        '@pinia/nuxt'
    ],
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
            onLogin: '/meusite/settings',
            onLogout: '/meusite',
            onAuthOnly: '/meusite',
            onGuestOnly: '/',
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
        bottom: true,
        left: true,
        duration: 5000
    },
    runtimeConfig: {
        public: {
            apiBase: 'http://localhost:8001/',
        }
    },
    pinia: {
        storesDirs: ['./stores/**']
    }
})