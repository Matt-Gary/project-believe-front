import { CardGallery } from './components/card-gallery';
import { useEffect, useState } from 'react';
import api from '../../api';

export function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getGallery() {
    const response = await api.get('/gallery/events');

    setGalleryItems(response.data);
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getGallery();
  }, []);

  return (
    <main className="wrapper py-16">
      <div className="flex">
        <h1 className="sm:text-4xl text-2xl font-bold text-center sm:text-start">
          Nossa Galeria de Fotos
        </h1>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-64 flex items-center justify-center border rounded-md"
              >
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ))
          : galleryItems.map((item) => (
              <CardGallery
                key={item.id}
                id={item.id}
                image={item.photos[0].photo_url}
                title={item.name}
                date={new Date(item.event_date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
                description={item.description}
              />
            ))}
      </div>
    </main>
  );
}
