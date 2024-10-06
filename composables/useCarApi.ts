import type {Vehicle} from "~/types/Vehicle";

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
        console.log('Error registering car', error);
        return {success: false, errors: {}};
    }
}