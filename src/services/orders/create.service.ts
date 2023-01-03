import apiClient from "@/utils/api";

type Payload = {
    product_id: number;
    product_quantity: number;
    total: number;
    price: number;
}

const createOrder = async (payload: Payload) => {
    const { data } = await apiClient.post('/order/create', payload)
    return data;
}

export default createOrder