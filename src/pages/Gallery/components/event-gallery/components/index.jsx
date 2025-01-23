import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { DialogContent } from '@/components/ui/dialog';
import galleryItems from '../galleryitems';
import { useParams } from 'react-router-dom';

export function CarrouselGallery() {
  const { id } = useParams();
  return (
    <DialogContent className="bg-transparent border-none">
      <Carousel>
        <CarouselContent>
          {galleryItems.map(
            (item) =>
              item.id === parseInt(id) &&
              item.images.map((img, index) => (
                <CarouselItem key={index}>
                  <img src={img} alt={item.title} />
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
