import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function CardWeGallery() {
  const carouselItems = [
    {
      src: 'src/assets/about-page-image-1.webp',
    },
    {
      src: 'src/assets/about-page-image-2.webp',
    },
    {
      src: 'src/assets/about-page-image-2.webp',
    },
    {
      src: 'src/assets/about-page-image-1.webp',
    },
    {
      src: 'src/assets/about-page-image-2.webp',
    },
    {
      src: 'src/assets/about-page-image-1.webp',
    },
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
            key={index}
            className="md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
          >
            <div className="p-1">
              <img
                src={item.src}
                className="rounded-md w-full object-cover"
                alt={`Imagem ${index + 1}`}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
