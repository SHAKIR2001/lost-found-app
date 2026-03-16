import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3005/api"
});

export const createItem = (data) => {
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

  return API.post(
    "/items",
    data,
    isFormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      : undefined
  );
};

export const getItems = () => API.get("/items");

export default API;