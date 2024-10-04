import type {UseFetchOptions} from "#app";
import {useCookie} from "#app/composables/cookie";
import {useFetch} from "#app/composables/fetch";

export function useApi<T>(path: string, options: UseFetchOptions<T> = {}) {

    let headers: any = {};

    const token = useCookie('sanctum.token.cookie');

    if (token) {
        headers['Authorization'] = `Bearer ${token.value}`;
    }

    const apiUrl = useRuntimeConfig().public.apiBase;

    return useFetch(apiUrl + path, {
        credentials: 'include',
        watch: false,
        ...options,
        headers: {
            ...headers,
            ...options?.headers,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
}
