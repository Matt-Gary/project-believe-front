import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function CardLearnWithUs() {
  const carouselItems = [
    {
      title: 'Bandeira Humana',
      src: 'src/assets/about-page-image-1.webp',
    },
    {
      title: 'Tutorial 2',
      src: 'src/assets/about-page-image-2.webp',
    },
    {
      title: 'Tutorial 3',
      src: 'src/assets/about-page-image-2.webp',
    },
    {
      title: 'Tutorial 4',
      src: 'src/assets/about-page-image-1.webp',
    },
    {
      title: 'Tutorial 5',
      src: 'src/assets/about-page-image-2.webp',
    },
    {
      title: 'Tutorial 6',
      src: 'src/assets/about-page-image-1.webp',
    },
  ];
  return (
    <Carousel className="w-full max-w-[600px] mx-auto rounded-md py-16">
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} className="rounded-md relative">
            <img src={item.src} className="rounded-md" alt={item.title} />
            <span className="absolute top-4 px-6 text-xl font-bold bg-black/50 rounded-r-md">
              {item.title}
            </span>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
