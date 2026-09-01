// WordPress REST API client for the headless Paradise Rentals frontend.
// Mirrors the shape the original Base44 components expect so the UI barely changes.

const WP_URL = import.meta.env.VITE_WP_URL;
const TOKEN_KEY = 'pr_wp_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function wp(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${WP_URL}/wp-json${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const msg = (data && (data.message || data.code)) || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// ---- Carts ----
export const wpCarts = {
  list: async () => wp('/paradise/v1/carts'),
  get: async (id) => wp(`/paradise/v1/carts/${id}`),
  create: async (data) => wp('/paradise/v1/carts', { method: 'POST', body: data, auth: true }),
  update: async (id, data) => wp(`/paradise/v1/carts/${id}`, { method: 'POST', body: data, auth: true }),
  remove: async (id) => wp(`/paradise/v1/carts/${id}`, { method: 'DELETE', auth: true }),
};

// ---- Bookings ----
export const wpBookings = {
  // public create (checkout)
  create: async (data) => wp('/paradise/v1/bookings', { method: 'POST', body: data }),
  // admin list, optional filters
  list: async () => wp('/paradise/v1/bookings', { auth: true }),
  filter: async (query) => {
    const qs = new URLSearchParams(query).toString();
    return wp(`/paradise/v1/bookings${qs ? '?' + qs : ''}`, { auth: true });
  },
  cancel: async (id) => wp(`/paradise/v1/bookings/${id}/cancel`, { method: 'POST', auth: true }),
};