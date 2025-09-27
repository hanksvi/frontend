import { useState } from 'react';
import { useLogin } from '../hooks/useAuth';

export default function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6 mt-8">
      <h2 className="text-3xl font-bold text-rose-700 mb-2 text-center">Iniciar Sesión</h2>
      <div className="text-center text-rose-900/80">
        Aquí irá el formulario de login de Clerk próximamente.<br />
        <span className="text-rose-500 font-semibold">(Login deshabilitado temporalmente)</span>
      </div>
    </div>
  );
}
