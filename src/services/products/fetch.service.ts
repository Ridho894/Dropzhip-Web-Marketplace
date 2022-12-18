import apiClient from "@/utils/api"

export type Params = {
    limit: number;
    take: number;
    sort_order: "DESC" | "ASC"
}

type Response = {
    data: {
        data: {
            id: number;
            name: string;
            description: string;
            price: number;
            image: string;
            category_id: string;
            created_by: string
            rating: number;
            free_delivery: boolean;
        }[];
    }
    current_page: number;
    from: number;
    total: number;
    per_page: number;
}

const fetchProduct = async (page: number, params: Partial<Params> = {}) => {
    const { data } = await apiClient.get<Response>(`/products?page=${page}`, { params })
    return data
}

export default fetchProduct