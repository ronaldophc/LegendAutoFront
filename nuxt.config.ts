import {defineNuxtConfig} from 'nuxt/config'

export default defineNuxtConfig({
    devtools: {enabled: true},

    modules: [
        'nuxt-auth-sanctum',
        '@nuxt/ui',
        '@nuxt/icon',
        '@nuxtjs/tailwindcss',
        'nuxt-snackbar',
        '@pinia/nuxt',
    ],

    sanctum: {
        baseUrl: 'https://api.akaindex.com.br',
        mode: 'cookie',
        redirectIfAuthenticated: true,
        redirectIfUnauthenticated: true,
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
            apiBase: 'https://api.akaindex.com.br/',
        }
    },

    pinia: {
        storesDirs: ['./stores/**']
    },

    compatibilityDate: '2024-10-09'
})