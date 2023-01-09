import axios from "axios";
import env from "@/config/env";
import { getSession } from "next-auth/react";

export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  "ngrok-skip-browser-warning": "69420",
};

let bearerToken: string = "";

const apiClient = axios.create({
  baseURL: `${env.API_DOMAIN}/api/`,
  headers,
});

// Add a request interceptor
apiClient.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (bearerToken && request.headers) {
    request.headers.Authorization = `Bearer ${bearerToken}`;
  } else if (session && request.headers) {
    request.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return request;
});

// Add a response interceptor
apiClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 && typeof window === "object") {
      window.location.href =
        "/login?redirect=" + encodeURIComponent(window.location.href);
    }

    return Promise.reject(error);
  }
);

const setBearerToken = (token: string) => {
  bearerToken = token;
};
export default apiClient;
export { setBearerToken };
