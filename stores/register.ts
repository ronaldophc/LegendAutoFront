import { defineStore } from 'pinia';
import Vehicle from "~/components/admin/create/Vehicle.vue";

export const useRegisterStore = defineStore('register', {
    state: () => ({
        vehicleType: '',
        vehicleInfo: {} as Vehicle,
        vehicleId: 0,
        links: [] as Array<{ id: number; label: string; icon: string; active: boolean }>,
        vehicleLinks: ref([
            {
                id: 1,
                label: 'Tipo de veículo',
                icon: `i-material-symbols:counter-1-outline`,
                active: true,
            },
            {
                id: 2,
                label: 'Informações do veículo',
                icon: `i-material-symbols:counter-2-outline`,
                active: false,
            },
            {
                id: 3,
                label: 'Carregar fotos do veículo',
                icon: `i-material-symbols:counter-3-outline`,
                active: false,
            }
        ])
    }),
    actions: {
        setVehicleType(type: string) {
            this.vehicleType = type;
        },
        setVehicleInfo(info: Vehicle) {
            this.vehicleInfo = info;
        },
        setVehicleId(id: number) {
            this.vehicleId = id;
        },
        getType() {
            if (this.vehicleType == 'motorcycle') {
                return 'Moto';
            }
            return 'Carro';
        }
    },
});