const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const authApi = {
  login: (credentials: any) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData: any) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => apiFetch('/auth/me'),
};

export const menuApi = {
  getAll: (category?: string) => apiFetch(`/menu${category ? `?category=${category}` : ''}`),
  getOne: (id: string) => apiFetch(`/menu/${id}`),
};

export const orderApi = {
  create: (orderData: any) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  getMyOrders: () => apiFetch('/orders/my-orders'),
  getOne: (id: string) => apiFetch(`/orders/${id}`),
};
