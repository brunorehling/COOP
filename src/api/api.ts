import axios from "axios";

const api = axios.create({
  baseURL: "url da api aqui",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    if ("set" in config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
