import type {Vehicle} from "~/types/Vehicle";
import type {UseFetchOptions} from "#app";

const VEHICLE_API_ENDPOINT = 'api/vehicles';

function createRequestBody(type: string, info: Vehicle, storeId: number) {
    return {
        type: type,
        ...info,
        store_id: storeId,
    };
}

function handleApiResponse(response: any) {
    if (response.status.value === 'error') {
        return {
            success: false,
            errors: response.error.value.data.errors || {}
        };
    }
    const register = useRegisterStore();
    const vehicleId = response.data.value.id;
    register.setVehicleId(vehicleId);
    return {success: true};
}

export async function useRegisterCar(info: Vehicle, type: string, storeId: number) {
    try {
        const requestBody = createRequestBody(type, info, storeId);
        const response = await useApi(VEHICLE_API_ENDPOINT, {
            method: 'POST',
            body: requestBody,
        });
        return handleApiResponse(response);
    } catch (error) {
        return {success: false, errors: {}};
    }
}

export async function getHomeVehicles(params: any) {
    try {
        const response = await useApi(VEHICLE_API_ENDPOINT, {
            params
        });
        return response.data.value;
    } catch (error) {
        return [];
    }
}

export async function getVehicles<T>(url: string, options: UseFetchOptions<T> = {}) {

    try {
        return await useApi(url, {
            params: {
                per_page: 10,
                ...options?.params,
            },
            headers: {
                ...options?.headers,
                'Accept': 'application/json',
            },
        });
    } catch (error) {
        console.log(error);
    }
}