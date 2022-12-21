import apiClient from "@/utils/api"

export type Payload = {
    name: string;
    slug: string;
    description: string;
    price: string;
    image: File;
    image_remove: number; // 1|0
    category_id: string
}

const createProduct = async (payload: Payload) => {
    const { data } = await apiClient.post<Response>('/product/create', payload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return data
}

export default createProduct