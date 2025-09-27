import { useUserReservations } from '../hooks/useReservations';

export default function UserReservationsPage() {
  const { data, isLoading, isError } = useUserReservations();

  if (isLoading) return <div className="text-center mt-8">Cargando reservas...</div>;
  if (isError) return <div className="text-center text-red-600 mt-8">No se pudieron cargar las reservas.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-3xl font-bold text-rose-700 mb-4">Mis Reservas</h2>
      {data && data.length === 0 && <div>No tienes reservas.</div>}
      {data && data.map((res: any) => (
        <div key={res.id} className="border-b border-rose-200 py-4">
          <div className="font-semibold">Guía: {res.guideName}</div>
          <div>Fecha: {res.date}</div>
          <div>Estado: {res.status}</div>
        </div>
      ))}
    </div>
  );
}
