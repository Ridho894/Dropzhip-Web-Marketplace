import apiClient from "@/utils/api"

type Response = {
    data: {
        name: string;
        slug: string;
        icon: string;
    }[]
}

export const fetchCategories = async () => {
    const { data } = await apiClient.get<Response>('/category')
    return data
}