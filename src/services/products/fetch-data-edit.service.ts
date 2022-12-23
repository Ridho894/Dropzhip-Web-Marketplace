import apiClient from "@/utils/api"

type Response = {
    message: string;
    data: {
        id: number;
        name: string;
        slug: string;
        description: string;
        stock: number;
        rating: number;
        free_delivery: boolean;
        price: number;
        image: string;
        category_id: string;
        created_by: string
    }
}

const fetchProductWantToEdit = async (id: number) => {
    const { data } = await apiClient.get<Response>(`/product/edit/${id}`)
    return data
}

export default fetchProductWantToEdit