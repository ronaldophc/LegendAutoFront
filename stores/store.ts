import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useStore = defineStore('store', {
    state: () => ({
        store: {} as Store,
    }),
    actions: {
        async getStore() {
            if (this.store.email === undefined) {
                console.log(this.store.email);
                const {data} = await getStoreInfo(1);
                console.log(data);
                this.store = data;
                console.log('-------------------');
                console.log(this.store);
                return this.store;
            }
            return this.store;
        }
    },
});