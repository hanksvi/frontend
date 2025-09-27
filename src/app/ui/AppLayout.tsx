import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser, useLogout } from '../../hooks/useAuth';

export function AppLayout({ children }: { children: ReactNode }) {
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSuccess: () => navigate('/login', { replace: true }),
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 to-rose-100">
      <nav className="bg-rose-700 text-white shadow-lg px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-2xl tracking-tight">CityGuides</span>
        <div className="space-x-4">
          {user && <Link to="/guides" className="hover:text-rose-200 transition">Guías</Link>}
          {user && <Link to="/reservations" className="hover:text-rose-200 transition">Mis Reservas</Link>}
          {user && <button onClick={handleLogout} className="hover:text-rose-200 transition font-bold">Cerrar Sesión</button>}
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">{children}</main>
      <footer className="bg-rose-700 text-white text-center p-3 mt-8 shadow-inner">
        &copy; {new Date().getFullYear()} CityGuides
      </footer>
    </div>
  );
}
