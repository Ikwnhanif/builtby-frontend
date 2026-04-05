import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
});

// Tambahkan Interceptor untuk menyisipkan Token JWT
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getImageUrl = (path: string) => {
  if (!path || path.trim() === "") return "/placeholder-profile.png"; // Berikan fallback ke gambar lokal di folder public
  return `${process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8080/uploads"}/${path}`;
};
