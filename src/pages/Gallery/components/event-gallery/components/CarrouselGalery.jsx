import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { DialogContent } from '@/components/ui/dialog';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/api';

export default function CarrouselGallery() {
  const { id } = useParams();
  const [galleryItems, setGalleryItems] = useState([]);

  async function getGallery() {
    const response = await api.get('/gallery/events');
    setGalleryItems(response.data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getGallery();
  }, []);

  return (
    <DialogContent className="bg-transparent border-none">
      <Carousel>
        <CarouselContent>
          {galleryItems
            .filter((item) => item.id === parseInt(id))
            .flatMap((item) =>
              item.photos.map((photo, index) => (
                <CarouselItem
                  key={photo.id || index}
                  className="flex items-center justify-center"
                >
                  <img
                    src={photo.photo_url}
                    alt={photo.photo_name || item.name}
                    className="w-96 h-96 object-cover mx-auto rounded-md"
                  />
                </CarouselItem>
              )),
            )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </DialogContent>
  );
}
