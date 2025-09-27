import { useParams } from 'react-router-dom';
import { useReservationById } from '../hooks/useReservations';

export default function ReservationDetailPage() {
  const { id } = useParams();
  const { data: reservation, isLoading, isError } = useReservationById(id!);

  if (isLoading) return <div className="text-center mt-8">Cargando reserva...</div>;
  if (isError || !reservation) return <div className="text-center text-red-600 mt-8">No se pudo cargar la reserva.</div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-3xl font-bold text-rose-700 mb-2">Reserva #{reservation.id}</h2>
      <div className="mb-2">Guía: {reservation.guideName}</div>
      <div className="mb-2">Fecha: {reservation.date}</div>
      <div className="mb-2">Estado: {reservation.status}</div>
      <div className="mb-2">Usuario: {reservation.userName}</div>
    </div>
  );
}
