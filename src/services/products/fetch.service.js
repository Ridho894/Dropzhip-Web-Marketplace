import apiClient, { headers } from '@/utils/api'

export default async function fetchProducts() {
    const { data } = await apiClient.get('/products', { headers: headers })

    return data
}
