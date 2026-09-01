// Headless WordPress auth client (JWT via the paradise-rentals plugin).
import { wp, getToken, setToken } from './wpClient';

export const wpAuth = {
  getToken,
  setToken,

  async login(email, password) {
    const res = await wp('/paradise/v1/login', { method: 'POST', body: { username: email, password } });
    setToken(res.token);
    return res.user;
  },

  async me() {
    return wp('/paradise/v1/me', { auth: true });
  },

  async register({ email, password, name }) {
    return wp('/paradise/v1/register', { method: 'POST', body: { email, password, name } });
  },

  async resetPasswordRequest(email) {
    return wp('/paradise/v1/reset', { method: 'POST', body: { email } });
  },

  async resetPassword({ login, token, newPassword }) {
    return wp('/paradise/v1/reset/confirm', {
      method: 'POST',
      body: { login, token, password: newPassword },
    });
  },

  logout(redirectUrl) {
    setToken(null);
    if (redirectUrl) window.location.href = redirectUrl;
  },

  redirectToLogin(nextUrl) {
    const dest = `/login${nextUrl && nextUrl !== '/' ? '?returnTo=' + encodeURIComponent(nextUrl) : ''}`;
    window.location.href = dest;
  },

  isAuthenticated() {
    return !!getToken();
  },
};