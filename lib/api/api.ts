import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';


// const isLocal = process.env.NODE_ENV === "development";

// const baseURL = isLocal
//   ? process.env.NEXT_PUBLIC_API_URL + "/api" 
//   : process.env.NEXT_PUBLIC_API_URL;       



export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});
