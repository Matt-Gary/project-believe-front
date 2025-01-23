import { useParams } from 'react-router-dom';
import galleryItems from './galleryitems';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CarrouselGallery } from './components';

export function EventGallery() {
  const { id } = useParams();

  return (
    <Dialog>
      <main className="wrapper py-16">
        <h1 className="sm:text-4xl text-2xl font-bold text-center sm:text-start">
          {galleryItems.map((item) => item.id === parseInt(id) && item.title)}
        </h1>
        <div>
          {galleryItems.map(
            (item) =>
              item.id === parseInt(id) && (
                <DialogTrigger
                  key={item.id}
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center cursor-pointer"
                >
                  {item.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={item.title}
                      className="rounded-md w-80 h-64 object-cover"
                    />
                  ))}
                </DialogTrigger>
              ),
          )}
        </div>
        <CarrouselGallery />
      </main>
    </Dialog>
  );
}
