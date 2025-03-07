// ...existing code...
import { useParams } from 'react-router-dom';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import api from '../../../../api';
import CarrouselGallery from './components/CarrouselGalery';

export function EventGallery() {
  const { id } = useParams();
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
    <Dialog>
      <main className="wrapper py-16">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <h1 className="sm:text-4xl text-2xl font-bold text-center sm:text-start">
              {galleryItems.map(
                (item) => item.id === parseInt(id) && item.name,
              )}
            </h1>
            <div>
              {galleryItems.map(
                (item) =>
                  item.id === parseInt(id) && (
                    <DialogTrigger
                      key={item.id}
                      className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center cursor-pointer"
                    >
                      {item.photos.map((photo) => (
                        <img
                          key={photo.id}
                          src={photo.photo_url}
                          alt={photo.photo_name}
                          className="rounded-md h-64 object-cover max-w-[350px] min-w-[350px]"
                        />
                      ))}
                    </DialogTrigger>
                  ),
              )}
            </div>
            <CarrouselGallery />
          </>
        )}
      </main>
    </Dialog>
  );
}
