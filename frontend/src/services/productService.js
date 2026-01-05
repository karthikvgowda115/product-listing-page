import apiMethods from './api';

export const getProducts = async () => {
  const res = await apiMethods.getProducts();
  return res.data;
};

export const getProductById = async (id) => {
  const res = await apiMethods.getProductById(id);
  return res.data;
};

export const searchProducts = async (query) => {
  const res = await apiMethods.searchProducts(query);
  return res.data;
};
