import api from '@lib/axios';

export async function login(credentials: { email: string; password: string }) {
  return api.post('/auth/login', credentials);
}

export async function me() {
  return api.get('/auth/me');
}

export async function logout() {
  return api.post('/auth/logout');
}
