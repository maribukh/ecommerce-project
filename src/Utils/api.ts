import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const fetchProducts = async (limit: number, skip: number) => {
  const response = await axios.get(`${BASE_URL}/products`, {
    params: { limit, skip },
  });
  return response.data;
};

export const fetchProductDetails = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/products/categories`);
  return response.data;
};
