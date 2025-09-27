import { api } from './client';

export async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function logout() {
  await api.post('/auth/logout');
}

export async function getCurrentUser() {
  const { data } = await api.get('/auth/me');
  return data;
}
