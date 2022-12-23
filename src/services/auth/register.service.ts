import apiClient from "@/utils/api";

type Payload = {
    name: string;
    username: string;
    email: string;
    password: string;
}

type Response = {
    success: boolean;
    user: {
        name: string;
        username: string;
        email: string;
        is_admin: number;
        id: number
    }
}

const fetchRegister = async (payload: Payload) => {
    const { data } = await apiClient.post<Response>("/register", payload)
    return data
}

export default fetchRegister