import apiClient from "@/utils/api"
import { Response } from "./fetch.service";

export type Params = {
    search: string;
    limit: number;
    take: number;
    sort_order: "DESC" | "ASC"
}

const fetchProductByCategory = async (category: number, params: Partial<Params> = {}) => {
    const { data } = await apiClient.get<Response>(`/category/products-by-category/${category}`, { params })
    return data
}

export default fetchProductByCategory