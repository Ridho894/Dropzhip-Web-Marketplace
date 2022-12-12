import api from "@/utils/api";

type Payload = {
  email: string;
  password: string;
  "g-recaptcha-response": string;
};

type Response = {
  token_type: string;
  expires_in: number;
  access_token: string;
  user: {
    name: string;
    username: string;
    email: string;
    remember_token: null;
    is_admin: number;
    last_login: string;
    register_date: string | null;
    updated_at: string;
  };
};

const fetchSignin = async (payload: Payload) => {
  const { data } = await api.post<Response>("/login", payload);

  return data;
};

export default fetchSignin;
