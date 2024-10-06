import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useBreadCrumbStore = defineStore('breadCrumbStore', () => {
    const ICON_PREFIX = 'i-material-symbols:counter-';
    const vehicleLinks = ref([
        {
            id: 1,
            label: 'Tipo de veículo',
            icon: `${ICON_PREFIX}1-outline`,
            active: true,
        },
        {
            id: 2,
            label: 'Informações do veículo',
            icon: `${ICON_PREFIX}2-outline`,
            active: false,
        },
        {
            id: 3,
            label: 'Carregar fotos do veículo',
            icon: `${ICON_PREFIX}3-outline`,
            active: false,
        }
    ]);

    const activeLink = computed(() => vehicleLinks.value.find(link => link.active));

    function setActiveLink(id: number) {
        vehicleLinks.value.forEach(link => {
            link.active = link.id === id;
        });
    }

    return {
        vehicleLinks,
        activeLink,
        setActiveLink,
    };
});