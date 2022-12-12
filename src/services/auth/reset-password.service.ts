import api from "@/utils/api";

export type Payload = {
  token: string;
  password: string;
  password_confirmation: string;
  "g-recaptcha-response"?: string;
};

type Response = {
  message: string;
};

export default async function fetchResetPassword(payload: Payload) {
  const data = await api.post<Response>(`reset-password`, payload);

  return data;
}
