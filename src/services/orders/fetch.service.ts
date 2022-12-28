import apiClient from "@/utils/api";

type Response = {
    data: {
        id: number;
        product_name: string;
        product_image: string;
        quantity: number;
        price: number;
        total: number;
        created_by: string;
        created_at: string;
    }[]
}

export default async function fetchOrder() {
    const { data } = await apiClient.get<Response>('/order')
    return data;
}