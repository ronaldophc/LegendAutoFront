import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useStore = defineStore('store', {
    state: () => ({
        store: {} as Store,
    }),
    actions: {
        async getStore() {
            if (this.store.email === undefined) {
                const {data} = await getStoreInfo(1);
                this.store = data;
                return this.store;
            }
            return this.store;
        }
    },
});