import { api } from './client';

export async function searchGuides(params: { city?: string; language?: string; date?: string }) {
  const { data } = await api.get('/guides', { params });
  return data;
}

export async function getGuideById(id: string) {
  const { data } = await api.get(`/guides/${id}`);
  return data;
}
