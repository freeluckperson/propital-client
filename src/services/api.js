// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://server-o25o.onrender.com",
  withCredentials: true,
});

export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);
export const fetchNotifications = (token) =>
  api.get("/notifications", {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
