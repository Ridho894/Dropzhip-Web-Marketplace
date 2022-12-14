import apiClient from "@/utils/api"

type Payload = {
    id: number[]
}

const deleteProduct = async (payload: Payload) => {
    const { data } = await apiClient.post<Response>('/product/delete', payload)
    return data
}

export default deleteProduct