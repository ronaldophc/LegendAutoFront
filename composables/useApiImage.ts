import {useCookie} from "#app/composables/cookie";
import {useFetch} from "#app/composables/fetch";

export function useApiImage(formData: FormData) {

    let headers: any = {};

    const token = useCookie('sanctum.token.cookie');

    if (token) {
        headers['Authorization'] = `Bearer ${token.value}`;
    }

    const apiUrl = useRuntimeConfig().public.apiBase;

    return useFetch<JSON>(apiUrl + 'api/vehicles/images', {
        method: 'POST',
        credentials: 'include',
        body: formData,
        headers: {
            ...headers,
            'Accept': 'application/json',
        },
    });
}