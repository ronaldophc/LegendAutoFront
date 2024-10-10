import type { UseFetchOptions } from "#app";

function getHeaders(token: string | undefined): Record<string, string> {
    const headers: Record<string, string> = {};
    if (token) {
        headers["X-XSRF-TOKEN"] = token;
    }
    return headers;
}

const credentialsOption = 'include';
const watchOption = false;

export function useBaseApi<T>(path: string, options: UseFetchOptions<T> = {}) {
    const xsrfToken = useCookie("XSRF-TOKEN").value as string;
    const apiUrl = useRuntimeConfig().public.apiBase;

    return useFetch(apiUrl + path, {
        credentials: credentialsOption,
        watch: watchOption,
        ...options,
        headers: {
            ...getHeaders(xsrfToken),
            ...options.headers,
        },
    });
}

export async function useApi<T>(path: string, options: UseFetchOptions<T> = {}) {
    const xsrfToken = useCookie("XSRF-TOKEN").value as string;
    if (!xsrfToken) {
        await useBaseApi("sanctum/csrf-cookie");
    }
    return useBaseApi(path, options);
}