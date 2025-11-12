import axios from "axios";

const isLocal = process.env.NODE_ENV === "development";

const baseURL = isLocal
  ? "http://localhost:3000/api"        
  : "https://notehub-api.goit.study";  


export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});
