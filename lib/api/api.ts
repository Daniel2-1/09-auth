import axios from "axios";

const isLocal = process.env.NODE_ENV === "development";

const baseURL = isLocal
  ? "http://localhost:3000/api"        // при разработке
  : "https://notehub-api.goit.study";  // при продакшене (Vercel)


export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});
