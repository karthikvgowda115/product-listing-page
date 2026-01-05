import axios from 'axios';

// Base URL for API - In production, this would be your actual API endpoint
// Use import.meta.env for Vite (not process.env)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth tokens, etc.
api.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error.message);
      throw new Error('Network error. Please check your internet connection.');
    }

    // Handle different HTTP status codes
    const status = error.response?.status;
    let errorMessage = 'Something went wrong. Please try again.';

    switch (status) {
      case 400:
        errorMessage = 'Bad request. Please check your input.';
        break;
      case 401:
        errorMessage = 'Unauthorized. Please login again.';
        // You can redirect to login page here
        // window.location.href = '/login';
        break;
      case 403:
        errorMessage = 'Forbidden. You do not have permission.';
        break;
      case 404:
        errorMessage = 'Resource not found.';
        break;
      case 500:
        errorMessage = 'Internal server error. Please try again later.';
        break;
      default:
        errorMessage = error.response?.data?.message || errorMessage;
    }

    console.error('API Error:', {
      status,
      message: errorMessage,
      url: error.config?.url,
    });

    throw new Error(errorMessage);
  }
);

// API methods
export const apiMethods = {
  // Products
  getProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  searchProducts: (query) => api.get('/products/search', { params: { q: query } }),

  // Cart
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => api.post('/cart', { productId, quantity }),
  updateCartItem: (productId, quantity) => api.put(`/cart/${productId}`, { quantity }),
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
  clearCart: () => api.delete('/cart'),

  // Orders
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrderHistory: () => api.get('/orders'),
};

export default apiMethods;