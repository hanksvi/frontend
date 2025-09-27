import { api } from './client';

export async function getUserReservations() {
  const { data } = await api.get('/reservations/me');
  return data;
}

export async function getReservationById(id: string) {
  const { data } = await api.get(`/reservations/${id}`);
  return data;
}

export async function createReservation(payload: { guideId: string; date: string }) {
  const { data } = await api.post('/reservations', payload);
  return data;
}
