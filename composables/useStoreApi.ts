const STORE_API_ENDPOINT = 'api/stores';
// GET /{store}/hours -> Rota para exibir os horários de funcionamento de uma loja
// GET /stores -> Rota para exibir todas as lojas
// POST /stores -> Rota para criar uma loja
// GET /stores/{store} -> Rota para exibir uma loja
// PUT /stores/{store} -> Rota para atualizar uma loja

export async function getStoreInfo(id: number) {
    try {
        const response = await useApi(STORE_API_ENDPOINT + '/' + id);
        return {data: response.data.value.data, success: true};
    } catch (error) {
        return {success: false};
    }
}