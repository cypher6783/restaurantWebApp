const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ── Simple in-memory GET cache (TTL: 30 seconds) ──────────────────────────────
const cache = new Map<string, { data: unknown; expiresAt: number }>();
const CACHE_TTL_MS = 30_000;

function getCached(key: string) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { cache.delete(key); return null; }
  return entry.data;
}

function setCached(key: string, data: unknown) {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

export function invalidateCache(pattern?: string) {
  if (!pattern) { cache.clear(); return; }
  for (const key of cache.keys()) {
    if (key.includes(pattern)) cache.delete(key);
  }
}
// ──────────────────────────────────────────────────────────────────────────────

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const method = (options.method || 'GET').toUpperCase();
  const isGet = method === 'GET';
  const cacheKey = endpoint;

  // Return cached response immediately for GETs
  if (isGet) {
    const cached = getCached(cacheKey);
    if (cached) return cached;
  }

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
    throw new Error('Something went wrong');
  }

  // Cache successful GET responses
  if (isGet) setCached(cacheKey, data);

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

export const reservationApi = {
  create: (reservationData: any) => apiFetch('/reservations', { method: 'POST', body: JSON.stringify(reservationData) }),
  getMyReservations: () => apiFetch('/reservations'),
};

export const userApi = {
  getProfile: () => apiFetch('/users/profile'),
  updateProfile: (data: any) => apiFetch('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
  getFavorites: () => apiFetch('/users/favorites'),
  toggleFavorite: (menuItemId: string) => apiFetch('/users/favorites/toggle', { method: 'POST', body: JSON.stringify({ menuItemId }) }),
};
