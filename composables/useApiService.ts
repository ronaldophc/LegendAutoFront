import { useApi } from '~/composables/useApi';
import type {Car} from "~/types/Car";
import {useRegisterStore} from "~/stores/register";

export async function useApiService(info: Car, type: string, storeId: number) {
    try {
        const response = await useApi('api/vehicles', {
            method: 'POST',
            body: {
                type: type,
                ...info,
                store_id: storeId,
            },
        });

        if (response.status.value === 'error') {
            return { success: false, errors: response.error.value.data.errors || {} };
        }

        const register = useRegisterStore();
        const vehicleId = response.data.value.id;
        register.setVehicleId(vehicleId);

        return { success: true };
    } catch (err) {
        console.log('Erro ao salvar carro', err);
        return { success: false, errors: {} };
    }
}