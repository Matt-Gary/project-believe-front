import { CardGallery } from './components/card-gallery';
import { galleryItems } from './components/event-gallery/galleryitems';
import { useEffect } from 'react';

export function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="wrapper py-16">
      <div className="flex">
        <h1 className="sm:text-4xl text-2xl font-bold text-center sm:text-start">
          Nossa Galeria de Fotos
        </h1>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {galleryItems.map((item) => (
          <CardGallery
            key={item.id}
            id={item.id}
            image={item.imageMain}
            title={item.title}
            date={item.date}
          />
        ))}
      </div>
    </main>
  );
}
