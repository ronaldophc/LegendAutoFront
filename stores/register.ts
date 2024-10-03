// nuxt/stores/register.ts
import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
    state: () => ({
        vehicleType: '',
        vehicleInfo: {} as Car,
        vehiclePhotos: [] as File[],
        vehicleId: 0,
        links: [] as Array<{ id: number; label: string; icon: string; active: boolean }>,
    }),
    actions: {
        setVehicleType(type: string) {
            this.vehicleType = type;
        },
        setVehicleInfo(info: Car) {
            this.vehicleInfo = info;
        },
        setVehiclePhotos(photos: File[]) {
            this.vehiclePhotos = Array.from(photos);
        },
        setLinks(links: Array<{ id: number; label: string; icon: string; active: boolean }>) {
            this.links = links;
        },
        setVehicleId(id: number) {
            this.vehicleId = id;
        }
    },
});