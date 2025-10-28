import axios from "axios";

const api = axios.create({
  baseURL: "https://projeto-api-7h8d.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    if ("set" in config.headers) {
      // AxiosHeaders
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      // fallback para objeto simples (compatível com TS)
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
