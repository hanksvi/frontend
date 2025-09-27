import { useParams } from 'react-router-dom';
import { useGuideById } from '../hooks/useGuides';

export default function GuideDetailPage() {
  const { id } = useParams();
  const { data: guide, isLoading, isError } = useGuideById(id!);

  if (isLoading) return <div className="text-center mt-8">Cargando guía...</div>;
  if (isError || !guide) return <div className="text-center text-red-600 mt-8">No se pudo cargar la guía.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-3xl font-bold text-rose-700 mb-2">{guide.name}</h2>
      <p className="text-rose-700 mb-2">Ciudad: {guide.city} | Idioma: {guide.language}</p>
      <p className="mb-4">{guide.description}</p>
      <div className="text-center text-rose-900/80 mt-6">
        Aquí irá el formulario para reservar guía próximamente.<br />
        <span className="text-rose-500 font-semibold">(Funcionalidad deshabilitada temporalmente)</span>
      </div>
    </div>
  );
}
