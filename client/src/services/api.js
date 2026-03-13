import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3005/api"
});

export const createItem = (data) => API.post("/items", data);

export const getItems = () => API.get("/items");

export default API;