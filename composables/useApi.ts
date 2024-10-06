import type {UseFetchOptions} from "#app";

export function useBaseApi<T>(path: string, options: UseFetchOptions<T> = {}) {

    let headers: any = {};

    const token = useCookie("XSRF-TOKEN");

    if (token.value) {
        headers["X-XSRF-TOKEN"] = token.value as string;
    }

    const apiUrl = useRuntimeConfig().public.apiBase;

    return useFetch(apiUrl + path, {
        credentials: 'include',
        watch: false,
        ...options,
        headers: {
            ...headers,
            ...options?.headers
        },
    });
}

export async function useApi<T>(path: string, options: UseFetchOptions<T> = {}) {
    const token = useCookie("XSRF-TOKEN");

    if(!token.value){
        await useBaseApi("sanctum/csrf-cookie");
    }

    return useBaseApi(path, options);
}
