import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import tutorial1 from '@/assets/about-page-image-1.webp';
import tutorial2 from '@/assets/about-page-image-2.webp';

export function CardLearnWithUs() {
  const carouselItems = [
    {
      title: 'Bandeira Humana',
      src: tutorial1,
    },
    {
      title: 'Tutorial 2',
      src: tutorial2,
    },
    {
      title: 'Tutorial 3',
      src: tutorial1,
    },
    {
      title: 'Tutorial 4',
      src: tutorial2,
    },
    {
      title: 'Tutorial 5',
      src: tutorial1,
    },
    {
      title: 'Tutorial 6',
      src: tutorial2,
    },
  ];

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-[900px] mx-auto rounded-md py-16"
    >
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
          >
            <div className="p-1 relative">
              <img
                src={item.src}
                className="rounded-md w-full object-cover"
                alt={item.title}
              />
              <span className="absolute top-4 left-0 px-6 text-xl font-bold text-white bg-black/50 rounded-r-md">
                {item.title}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
