import axios from "axios";

//instance
const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
});

export default api;
