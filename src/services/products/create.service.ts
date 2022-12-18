import apiClient from "@/utils/api"

export type Payload = {
    name: string;
    slug: string;
    description: string;
    price: string;
    image: string;
    category_id: string
}

const createProduct = async (payload: Payload) => {
    const { data } = await apiClient.post<Response>('/product/create', payload)
    return data
}

export default createProduct