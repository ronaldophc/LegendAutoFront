import {defineNuxtConfig} from 'nuxt/config'

export default defineNuxtConfig({
    devtools: {enabled: false},

    ssr: false,

    modules: [
        'nuxt-auth-sanctum',
        '@nuxt/ui',
        '@nuxt/icon',
        '@nuxtjs/tailwindcss',
        'nuxt-snackbar',
        '@pinia/nuxt',
    ],

    sanctum: {
        baseUrl: process.env.NUXT_PUBLIC_SANCTUM_BASE_URL || 'http://localhost:8001',
        mode: 'cookie',
        endpoints: {
            login: '/api/users/login',
            logout: '/api/users/logout',
            user: '/api/user',
        },
        redirect: {
            keepRequestedRoute: false,
            onLogin: '/meusite',
            onLogout: '/meusite/login',
            onAuthOnly: '/meusite/login',
            onGuestOnly: '/meusite',
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
            apiBase: process.env.NUXT_PUBLIC_RUNTIME_CONFIG_PUBLIC_API_BASE || 'http://localhost:8001/',
        }
    },

    pinia: {
        storesDirs: ['./stores/**']
    },

    compatibilityDate: '2024-10-09'
})