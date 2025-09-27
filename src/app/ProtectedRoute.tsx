import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useAuth';

export function ProtectedRoute() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <div className="text-center mt-8">Cargando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
