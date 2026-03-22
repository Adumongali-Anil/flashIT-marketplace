import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

api.interceptors.request.use((config) => {

  let token = localStorage.getItem("token");

  if (token) {
    token = token.trim();
    // Guard against common bad stored values
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
    // Avoid "Bearer Bearer <token>" if backend already returns prefixed token
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