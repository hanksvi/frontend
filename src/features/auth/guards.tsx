import { useSession } from './useSession';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, status, me } = useSession();
  // Implementar lógica de protección y llamada a me()
  if (status === 'unauthenticated') return <Navigate to="/login" />;
  return <>{children}</>;
}

export function RequireRole({ role, children }: { role: string; children: ReactNode }) {
  const { user } = useSession();
  if (!user || user.role !== role) return <Navigate to="/login" />;
  return <>{children}</>;
}
