import { useQuery } from '@tanstack/react-query';
import { getUserReservations, getReservationById, createReservation } from '../api/reservations';

export function useUserReservations() {
  return useQuery({
    queryKey: ['userReservations'],
    queryFn: getUserReservations,
  });
}

export function useReservationById(id: string) {
  return useQuery({
    queryKey: ['reservation', id],
    queryFn: () => getReservationById(id),
    enabled: !!id,
  });
}
