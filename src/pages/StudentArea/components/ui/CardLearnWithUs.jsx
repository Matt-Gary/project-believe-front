import { Play } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Imagens de fallback
import tutorial1 from '@/assets/about-page-image-1.webp';
import tutorial2 from '@/assets/about-page-image-2.webp';

export function CardLearnWithUs({ tutorials = [], loading = false }) {
  // Função para extrair ID do YouTube da URL
  function getYoutubeId(url) {
    if (!url) return '';
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  // Gerar uma duração aleatória
  const randomDuration = () => {
    const minutes = Math.floor(Math.random() * 10) + 5;
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-[1000px] mx-auto rounded-md py-8"
    >
      <CarouselContent>
        {loading
          ? // Placeholders de carregamento
            Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem
                key={`loading-${index}`}
                className="md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
              >
                <div className="p-1">
                  <div className="bg-zinc-800 rounded-lg h-[280px] animate-pulse flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
                  </div>
                </div>
              </CarouselItem>
            ))
          : tutorials.map((item, index) => (
              <CarouselItem
                key={item.id || `tutorial-${index}`}
                className="md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
              >
                <div className="p-2">
                  <a
                    href={item.url}
                    className="block overflow-hidden bg-zinc-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative overflow-hidden">
                      {/* Thumbnail com overlay */}
                      <img
                        src={
                          item.thumbnail ||
                          `https://img.youtube.com/vi/${getYoutubeId(item.url)}/hqdefault.jpg`
                        }
                        alt={`Thumbnail: ${item.title}`}
                        className="w-full h-[160px] object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Overlay escuro com gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>

                      {/* Ícone de play centralizado */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-blue-500/80 rounded-full p-2 transform scale-90 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-600/90">
                          <Play className="h-6 w-6 text-white" fill="white" />
                        </div>
                      </div>

                      {/* Duração do vídeo */}
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-medium text-white">
                        {randomDuration()}
                      </div>
                    </div>

                    {/* Barra colorida */}
                    <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>

                    {/* Conteúdo do card */}
                    <div className="p-3">
                      <h3 className="font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors text-sm">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 text-xs mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </a>
                </div>
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious className="bg-white text-zinc-900 hover:bg-zinc-100" />
      <CarouselNext className="bg-white text-zinc-900 hover:bg-zinc-100" />
    </Carousel>
  );
}
