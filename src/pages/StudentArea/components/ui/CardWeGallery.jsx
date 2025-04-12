import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import galeria1 from '@/assets/about-page-image-1.webp';
import galeria2 from '@/assets/about-page-image-2.webp';

export function CardWeGallery({ photos = [] }) {
  // Filtrar para mostrar apenas fotos públicas
  const publicPhotos = photos.filter((photo) => photo.visibility === 'PUBLIC');

  // Se não receber fotos públicas, usar imagens padrão
  const carouselItems =
    publicPhotos.length > 0
      ? publicPhotos
      : [
          { src: galeria1 },
          { src: galeria2 },
          { src: galeria2 },
          { src: galeria1 },
          { src: galeria2 },
          { src: galeria1 },
        ];

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-[900px] mx-auto rounded-md pb-8 pt-16"
    >
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem
            key={item.id || index}
            className="md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
          >
            <div className="p-1 group relative overflow-hidden">
              <img
                src={item.src}
                className="rounded-md w-full object-cover aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
                alt={
                  item.eventName
                    ? `Foto de ${item.eventName}`
                    : `Imagem ${index + 1}`
                }
              />

              {item.eventName && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <h3 className="text-white font-bold text-sm truncate">
                    {item.eventName}
                  </h3>
                </div>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-white text-zinc-900 hover:bg-zinc-100" />
      <CarouselNext className="bg-white text-zinc-900 hover:bg-zinc-100" />
    </Carousel>
  );
}
