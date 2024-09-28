import {defineStore} from "pinia";

export const useRegisterStore = defineStore('register', {
    state: () => ({
        vehicleType: '',
        vehicleInfo: '',
        vehiclePhotos: [],
    }),
    actions: {
        setVehicleType(type: string) {
            this.vehicleType = type
        },
        setVehicleInfo(info: string) {
            this.vehicleInfo = info
        },
        setVehiclePhotos(photos: FileList) {
            this.vehiclePhotos = Array.from(photos)
        },
    },
})