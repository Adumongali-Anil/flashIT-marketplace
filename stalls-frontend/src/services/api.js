import axios from "axios";

const api = axios.create({
  baseURL: "https://flashit-marketplace.onrender.com"
});

api.interceptors.request.use((config) => {

  let token = localStorage.getItem("token");

  if (token) {
    token = token.trim();

    if (
      token === "null" ||
      token === "undefined" ||
      token === "NaN" ||
      token === ""
    ) {
      token = null;
    } else if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'"))
    ) {
      token = token.slice(1, -1);
    }
  }

  if (token) {
    if (token.toLowerCase().startsWith("bearer ")) {
      token = token.slice(7).trim();
    }

    const headers = config.headers ?? {};
    config.headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
  }

  return config;
});

export default api;