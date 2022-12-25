import apiClient from "@/utils/api"

type Response = {
    data: {
        id: number;
        name: string;
        slug: string;
        description: string;
        price: number;
        image: string;
        category_id: string;
        created_by: string
        rating: number;
        free_delivery: boolean;
        stock: number;
    }
}

const fetchDetailProduct = async (slug: string) => {
    const { data } = await apiClient.get<Response>(`/products/product-detail/${slug}`)
    return data
}

export default fetchDetailProduct