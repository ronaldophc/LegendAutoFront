export async function useImageApi(formData: FormData) {

    return useApi<JSON>('api/vehicles/images', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    });
}