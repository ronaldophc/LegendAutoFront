export async function useApiImage(formData: FormData) {
    const token = useCookie('sanctum.token.cookie');
    try {
        await useFetch('http://localhost:8001/api/vehicles/images', {
            method: 'POST',
            credentials: 'include',
            watch: false,
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        return { success: true };
    } catch (error) {
        console.error('Upload error:', error);
        return { success: false };
    }
}