import apiClient from "@/utils/api"

export type Params = {
    search: string;
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
        }[];
    }
    current_page: number;
    from: number;
    total: number;
    per_page: number;
    message: string;
}

const fetchProductByUser = async (page: number, params: Partial<Params> = {}) => {
    const { data } = await apiClient.get<Response>(`/product?page=${page}`, { params })
    return data
}

export default fetchProductByUser