import { Link } from 'react-router-dom';
import { CardWeGallery } from '../ui/CardWeGallery';
import { useState, useEffect, useContext } from 'react';
import api from '@/api';
import { AuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export function WeGallery() {
  const [galleryEvents, setGalleryEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(AuthContext);

  // Buscar eventos da galeria
  const fetchGalleryEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/gallery/events');

      console.log('Dados recebidos da API:', response.data);
      setGalleryEvents(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos da galeria:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryEvents();
  }, []);

  // Extrair apenas fotos públicas de todos os eventos para o carrossel
  // Aqui fazemos uma verificação extra para garantir que só fotos públicas são incluídas
  const allPhotos = galleryEvents.flatMap(
    (event) =>
      event.photos
        ?.filter((photo) => photo.visibility === 'PUBLIC') // Filtra apenas fotos públicas
        .map((photo) => ({
          id: photo.id,
          src: photo.photo_url,
          eventId: event.id,
          eventName: event.name,
          visibility: photo.visibility, // Mantém o campo de visibilidade
        })) || [],
  );

  console.log(`Total de ${allPhotos.length} fotos públicas encontradas`);

  return (
    <div className="wrapper mx-auto pt-16 flex flex-col">
      <h1 className="font-bold text-center lg:text-start text-2xl md:text-5xl uppercase">
        Nossa Galeria de imagens
      </h1>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {allPhotos.length > 0 ? (
            <CardWeGallery photos={allPhotos} />
          ) : (
            <div className="text-center py-10 text-neutral-400">
              Nenhuma foto pública encontrada na galeria
            </div>
          )}

          <Link to="/galeria" className="button self-center">
            Ver galeria completa
          </Link>
        </>
      )}
    </div>
  );
}
