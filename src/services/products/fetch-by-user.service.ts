import apiClient from "@/utils/api"

export type Params = {
    limit: number;
    take: number;
    sort_order: "DESC" | "ASC"
}

type Response = {
    data: {
        data: {
            name: string;
            description: string;
            price: number;
            image: string;
            category_id: string;
            created_by: string
        }[];
    }
    current_page: number;
    from: number;
    total: number;
    per_page: number;
}

const fetchProductByUser = async (page: number, params: Partial<Params> = {}) => {
    const { data } = await apiClient.get<Response>(`/product?page=${page}`, { params })
    return data
}

export default fetchProductByUser