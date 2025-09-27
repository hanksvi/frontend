import { create } from 'zustand';

export type User = {
  id: string;
  email: string;
  role: 'traveler' | 'admin';
};

export type SessionStatus = 'unknown' | 'authenticated' | 'unauthenticated';

interface SessionState {
  user: User | null;
  status: SessionStatus;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  me: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useSession = create<SessionState>((set) => ({
  user: null,
  status: 'unknown',
  async login(credentials) {
    // Implementar llamada a /auth/login
  },
  async me() {
    // Implementar llamada a /auth/me
  },
  async logout() {
    // Implementar llamada a /auth/logout
  },
}));
