import {useBaseApi} from "~/composables/useApi";

export async function useApiImage(formData: FormData) {

    let headers: any = {};

    const token = useCookie("XSRF-TOKEN");

    if(!token.value){
        await useBaseApi("/sanctum/csrf-cookie");
    }

    headers["X-XSRF-TOKEN"] = token.value as string;

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