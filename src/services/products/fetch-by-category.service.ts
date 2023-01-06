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
            slug: string;
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
    message: string;
}

const fetchProductByCategory = async (category: number, params: Partial<Params> = {}) => {
    const { data } = await apiClient.get<Response>(`/category/products-by-category/${category}`, { params })
    return data
}

export default fetchProductByCategory