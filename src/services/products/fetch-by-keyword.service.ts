import apiClient from "@/utils/api"
import { Response } from "./fetch.service";

export type Params = {
    keyword: string;
    limit: number;
    take: number;
    sort_order: "DESC" | "ASC"
}

const fetchProductByKeyword = async (params: Partial<Params> = {}) => {
    const { data } = await apiClient.get<Response>(`/products/search`, { params })
    return data
}

export default fetchProductByKeyword