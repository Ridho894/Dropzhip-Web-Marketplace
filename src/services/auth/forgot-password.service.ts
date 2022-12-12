import api from "@/utils/api";

type Payload = {
  email: string;
  "g-recaptcha-response": string;
};

type Response = {
  message: string;
};

export default async function fetchForgotPassword(payload: Payload) {
  const { data } = await api.post<Response>(`forget-password`, payload);

  return data;
}
